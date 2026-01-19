import {Tile} from './tile';

export class Card {
  constructor(public id: number, public name: string, public tiles: Array<Tile>) {};
}
