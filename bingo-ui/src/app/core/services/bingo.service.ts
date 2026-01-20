import {Injectable, signal, WritableSignal} from '@angular/core';
import {Card} from '../../models/card';

@Injectable({
  providedIn: 'root'
})

export class BingoService {
  url = 'http://localhost:8080/api';

  cards: WritableSignal<Card[]> = signal([]);

  async getCards() {
    this.cards.set(await fetch(`${this.url}/cards`)
      .then(response => response.json()));
  }

  async getCard(id: number | string) {
    let card = this.cards().find(card => card.id === id);
    if (!card) {
      console.log('Fetching card from API with id:', id);
      const cardResp = await fetch(`${this.url}/card/${id}`);
      card = await cardResp.json();
      if (card) {
        console.log('Card fetched:', card);
      }
    }
    return card
  }

  markNumber(cardId: number, index: number) {
    return fetch(`${this.url}/cards/${cardId}/cell/${index}`, {
      method: 'PATCH'
    }).then(response => response.json());
  }
}
