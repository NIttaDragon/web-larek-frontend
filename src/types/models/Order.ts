export interface IOrder {
  paymentMethod: string | null;
  deliveryAddress: string | null;
  email: string | null;
  phone: string | null;
}

export class Order implements IOrder {
  paymentMethod: string | null = null;
  deliveryAddress: string | null = null;
  email: string | null = null;
  phone: string | null = null;
}
