import { IOrder } from "./models/Order";
import { IProduct } from "./models/Product";

export interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}