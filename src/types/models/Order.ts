export interface IOrder {
  paymentMethod: string | null;
  deliveryAddress: string | null;
  email: string | null;
  phone: string | null;

  // validatePayment(): boolean;
  // validateContacts(): boolean;
}

export interface IOrderResult {
  id: string;
}