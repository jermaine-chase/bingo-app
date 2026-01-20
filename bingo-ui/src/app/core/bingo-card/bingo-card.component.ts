import {Component, input, OnChanges, OnInit, signal} from '@angular/core';
import {BingoService} from '../services/bingo.service';
import {Card} from '../../models/card';

@Component({
  selector: 'app-bingo-card',
  imports: [],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.css'
})
export class BingoCardComponent implements OnInit, OnChanges {
    id = input<string>();
    card = signal({} as Card | undefined);
    constructor(private bingoService: BingoService) {
    }

    async ngOnInit() {
      if (this.id()) {
        console.log('Id is', this.id());
        const c = await this.bingoService.getCard(this.id()!);
        this.card.set(c);
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

    markTile(index: number) {
      if (!this.card()!.id) {
        console.error('Card ID is undefined');
        return;
      }
      if (!index) {
        console.error('Index is undefined');
        return;
      }
      //console.log(`Marking tile at index ${index} for card ID ${this.card()!.id}`);
      this.bingoService.markNumber(this.card()!.id, index).then(updatedCard => {
        console.log('Tile marked, updated card:', updatedCard);
        this.card.set(updatedCard);
      });
    }

    isTextTruncated(element: HTMLElement): boolean {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
}
