import { IBasket } from "../models/Basket";

export interface IBasketView {
  render(basket: IBasket, basketCardArray: HTMLElement | HTMLElement[]): HTMLElement;
}
