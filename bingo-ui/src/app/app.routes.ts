import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {BingoCardComponent} from './core/bingo-card/bingo-card.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'bingo/:id',
    loadComponent: () => import('./core/bingo-card/bingo-card.component').then(m => m.BingoCardComponent)
  }
];
