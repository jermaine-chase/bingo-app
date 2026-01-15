import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BingoService {
  url = 'http://localhost:8080/bingo';

  cards = signal([]);

  async getCards() {
    this.cards.set(await fetch(`${this.url}/cards`)
      .then(response => response.json()));
  }

  async getCard(id: number) {
    return fetch(`${this.url}/card/${id}`)
      .then(response => response.json());
  }

  markNumber(cardId: number, index: number) {
    return fetch(`${this.url}/cards/${cardId}/cell/${index}`, {
      method: 'PATCH'
    }).then(response => response.json());
  }
}
