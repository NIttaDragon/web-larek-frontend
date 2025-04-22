import { EventEmitter } from "../../components/base/events";
import { Order, IOrder } from "../models/Order";
import { OrderView, IOrderView } from "../views/OrderView";
import { ContactsView, IContactsView } from "../views/ContactsView";
import { SuccessView, ISuccessView } from "../views/SuccessView";
import { Basket } from "../models/Basket";

export interface IOrderController {
  showOrderForm(): void;
  submitOrder(orderData: IOrder): void;
  showContactsForm(): void;
  submitContacts(orderData: IOrder): void;
  completeOrder(): void;
}

export class OrderController implements IOrderController {
  private order: Order;
  private eventEmitter: EventEmitter;
  private orderView: IOrderView;
  private contactsView: IContactsView;
  private successView: ISuccessView;
  private basket: Basket;

  constructor(eventEmitter: EventEmitter) {
      this.order = new Order();
      this.eventEmitter = eventEmitter;
      this.orderView = new OrderView(eventEmitter);
      this.contactsView = new ContactsView(eventEmitter);
      this.successView = new SuccessView();
      this.basket = new Basket();
  }

  showOrderForm(): void {
      this.orderView.render();
      this.orderView.openModal();
  }

  submitOrder(orderData: IOrder): void {
      this.order.deliveryAddress = orderData.deliveryAddress;
      this.order.paymentMethod = orderData.paymentMethod;
      this.showContactsForm();
  }

  showContactsForm(): void {
      this.contactsView.render();
      this.contactsView.openModal();
  }

  submitContacts(orderData: IOrder): void {
      this.order.email = orderData.email;
      this.order.phone = orderData.phone;
      this.completeOrder();
  }

  completeOrder(): void {
      // Здесь можно отправить данные заказа на сервер
      // ...

      this.successView.render(this.basket.totalPrice);
      this.successView.openModal();
      this.basket.clear();
      this.eventEmitter.emit('basket:clear');
  }
}
