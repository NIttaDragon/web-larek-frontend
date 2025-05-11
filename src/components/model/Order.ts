import { IOrder } from "../../types/models/Order";

export class Order implements IOrder {
  payment: string | null = null;
  address: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  total: number | null;
  items: string[] | null;
}
