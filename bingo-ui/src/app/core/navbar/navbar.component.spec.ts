import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the component (if it's standalone) or declare it
      imports: [NavbarComponent],
      // providers: [BingoService] <-- Add mock services here
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show have menu items', () => {
    expect(component.tabList).toBeDefined();
    expect(component.tabList.length).toBeGreaterThan(0);
  });

  /*it('should show some menu items', () => {
    expect(fixture.nativeElement.querySelector('[data-test=""]')).toBeTruthy();
  });*/
});
