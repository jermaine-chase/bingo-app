import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from '@aws-cdk/aws-eks-v2-alpha'; // 2026 standard for Auto Mode
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as cp_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as iam from 'aws-cdk-lib/aws-iam';

export class BingoCdkStack extends cdk.Stack {
  appName = 'BingoApi';
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create a VPC for the Cluster
    const vpc = new ec2.Vpc(this, 'SpringVpc', { maxAzs: 3 });

    // 2. Create ECR Repository for Spring Boot images
    const repository = new ecr.Repository(this, `${this.appName}Repo`, {
      repositoryName: 'bingo-api-app',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev; use RETAIN for prod
    });

    // 3. Provision EKS Cluster with Auto Mode enabled
    const cluster = new eks.Cluster(this, `${this.appName}Cluster`, {
      vpc,
      version: eks.KubernetesVersion.V1_31,
      defaultCapacityType: eks.DefaultCapacityType.AUTOMODE, // Offloads node management to AWS
      authenticationMode: eks.AuthenticationMode.API,
    });

    // 4. CI/CD Pipeline Infrastructure
    const sourceArtifact = new codepipeline.Artifact();
    const buildArtifact = new codepipeline.Artifact();

    // CodeBuild project to build JAR and Docker image
    const buildProject = new codebuild.PipelineProject(this, `${this.appName}Build`, {
      environment: {
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_5,
        privileged: true, // Required for Docker builds
      },
      environmentVariables: {
        REPOSITORY_URI: { value: repository.repositoryUri },
        CLUSTER_NAME: { value: cluster.clusterName },
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          pre_build: {
            commands: [
              'echo Logging in to Amazon ECR...',
              'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI'
            ]
          },
          build: {
            commands: [
              'echo Building JAR with Maven...',
              './mvnw clean package -DskipTests',
              'echo Building Docker image...',
              'docker build -t $REPOSITORY_URI:latest .',
              'docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION'
            ]
          },
          post_build: {
            commands: [
              'echo Pushing Docker image...',
              'docker push $REPOSITORY_URI:latest',
              'docker push $REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION',
              'echo Updating EKS Deployment...',
              'aws eks update-kubeconfig --name $CLUSTER_NAME',
              'kubectl set image deployment/spring-boot-deployment spring-boot-app=$REPOSITORY_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION'
            ]
          }
        }
      })
    });

    // Grant permissions
    repository.grantPullPush(buildProject);
    cluster.grantAdminAccess(buildProject.role!); // Allows CodeBuild to run kubectl commands

    // 5. Define the Pipeline
    new codepipeline.Pipeline(this, `${this.appName}Pipeline`, {
      pipelineName: `${this.appName}Pipeline`,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new cp_actions.GitHubSourceAction({
              actionName: 'GitHub_Source',
              owner: 'YOUR_GITHUB_USER',
              repo: 'YOUR_REPO_NAME',
              oauthToken: cdk.SecretValue.secretsManager('github-token'),
              output: sourceArtifact,
            }),
          ],
        },
        {
          stageName: 'BuildAndDeploy',
          actions: [
            new cp_actions.CodeBuildAction({
              actionName: 'Build_and_Deploy',
              project: buildProject,
              input: sourceArtifact,
              outputs: [buildArtifact],
            }),
          ],
        },
      ],
    });
  }
}