import { IOrder } from "../../types/models/Order";

export class Order implements IOrder {
  paymentMethod: string | null = null;
  deliveryAddress: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  totalPrice: number;
    
  // validatePayment(): boolean {
  //     return !!this.paymentMethod && !!this.deliveryAddress;
  // }
  
  // validateContacts(): boolean {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     const phoneRegex = /^\+?[\d\s\-()]+$/;
      
  //     return !!this.email && emailRegex.test(this.email) && 
  //             !!this.phone && phoneRegex.test(this.phone);
  // }
}