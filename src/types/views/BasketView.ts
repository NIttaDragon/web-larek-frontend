import { IBasket } from "../models/Basket";

export interface IBasketView {
  render(basket: IBasket): HTMLElement;
}
