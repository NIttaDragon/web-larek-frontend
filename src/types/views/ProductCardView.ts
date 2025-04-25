import { IProduct } from "../models/Product";

export interface IProductCardView {
  render(product: IProduct): HTMLElement;
}
