import { IProduct } from "../models/Product";

export interface IProductModalView {
  render(product: IProduct, isInBasket?: boolean): HTMLElement;
}
