import { IProduct } from "../models/Product";

export interface IBasketController {
  addToBasket(product: IProduct): void;
  removeFromBasket(productId: string): void;
  showBasket(): void;
}
