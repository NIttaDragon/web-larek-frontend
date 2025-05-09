import { IOrder } from "../../types/models/Order";

export class Order implements IOrder {
  payment: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  total: number | null;
  items: string[] | null;
}
