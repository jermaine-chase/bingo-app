import {Component, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {BingoService} from '../services/bingo.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tabList: Array<{ id: number; label: string; route: string }> = [];
  constructor(private router: Router, private bingoService: BingoService) {
    /*if (this.getCards().length === 0) {
      this.bingoService.getCards();
    }
    const cards = this.getCards();
    this.tabList = cards.map((card: any) => ({id: card.id, label: `${card.label}`, route: `/bingo/${card.id}`} ));*/
    this.tabList = [{id: 1, label: 'Monthly BINGO', route: '/bingo/1'},
      {id: 2, label: 'Weekly BINGO', route: `/bingo/2`}];
  }



  getCards = computed(() => this.bingoService.cards() );
}
