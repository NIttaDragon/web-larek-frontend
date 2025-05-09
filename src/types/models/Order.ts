import { IProduct } from "./Product";

export interface IOrder {
  payment: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  total: number | null;
  items: string[] | null;
}

export interface IOrderResult {
  id: string;
}