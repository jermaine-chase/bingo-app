import {Component, input, OnChanges, OnInit} from '@angular/core';
import {BingoService} from '../services/bingo.service';

@Component({
  selector: 'app-bingo-card',
  imports: [],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.css'
})
export class BingoCardComponent implements OnInit, OnChanges {
    id = input<string>();
    constructor(private bingoService: BingoService) {
    }

    ngOnInit() {
      if (this.id()) {
        console.log('Id is', this.id());
        const c = this.bingoService.getCard(this.id()!);
        console.log(c);
      } else {
        console.log('Id is undefined');
      }
    }

    ngOnChanges() {
      console.log('Changes detected for id:', this.id());
      if (this.id()) {
        this.bingoService.getCard(this.id()!).then(card => {
          console.log('Fetched card:', card);
        });
      }
    }
}
