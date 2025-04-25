import { IProduct } from "../models/Product";

export interface IProductModalView {
  render(product: IProduct): HTMLElement;
}
