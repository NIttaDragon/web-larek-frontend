import { IOrder } from "./models/Order";

export type FormErrors = Partial<Record<keyof IOrder, string>>;