import {Injectable, signal, WritableSignal} from '@angular/core';
import {Card} from '../../models/card';

@Injectable({
  providedIn: 'root'
})

export class BingoService {
  url = '/api/bingo';

  cards: WritableSignal<Card[]> = signal([]);

  async getCards() {
    this.cards.set(await fetch(`${this.url}/cards`)
      .then(response => response.json()));
  }

  async getCard(id: number | string) {
    let card = this.cards().find(card => card.id === id);
    if (!card) {
      card = await fetch(`${this.url}/card/${id}`)
        .then(response => {
          console.log('Fetching card from API with id:', id);
          console.log(response);
          return response.json()
        });
    }
    return card
  }

  markNumber(cardId: number, index: number) {
    return fetch(`${this.url}/cards/${cardId}/cell/${index}`, {
      method: 'PATCH'
    }).then(response => response.json());
  }
}
