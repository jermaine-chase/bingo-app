import {Component, computed, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {BingoService} from '../services/bingo.service';
import {Card} from '../../models/card';

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
export class NavbarComponent implements OnInit {
  tabList: Array<{ id: number; label: string; route: string }> = [];
  cards: Card[] = [];
  constructor(private router: Router, private bingoService: BingoService) {
  console.log('NavbarComponent initialized');
  }

  async ngOnInit(): Promise<void> {
    console.log('NavbarComponent ngOnInit');
    await this.bingoService.getCards();
    this.tabList = this.bingoService.cards().map((card: any) => ({id: card.id, label: `${card.name}`, route: `/bingo/${card.id}`} ));
    console.log(this.tabList);
  }
}
