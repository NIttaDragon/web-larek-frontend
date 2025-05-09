import { IOrder } from "./models/Order";

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IFormValidators<T> {
  [key: string]: (value: string) => string | null;
}