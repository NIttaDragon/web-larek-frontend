import { IOrder } from "../models/Order";

export interface IOrderView {
    render(order: IOrder): HTMLElement;
    setPaymentMethod(method: string): void;
    setAddress(value: string): void;
    setValidState(isValid: boolean, error?: string): void;
}
