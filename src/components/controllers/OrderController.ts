// import { IOrderController } from "../../types/controllers/OrderController";
import { Order } from "../model/Order";
import { EventEmitter } from "../base/events";
import { Basket } from "../model/Basket";
import { IOrderView } from "../../types/views/OrderView";
import { IContactsView } from "../../types/views/ContactsView";
import { ISuccessView } from "../../types/views/SuccessView";
import { OrderView } from "../view/OrderView";
import { ContactsView } from "../view/ContactsView";
import { SuccessView } from "../view/SuccessView";
import { Modal } from "../view/Modal";

export class OrderController /*implements IOrderController*/ {
    private order: Order;
    private eventEmitter: EventEmitter;
    private orderView: IOrderView;
    private contactsView: IContactsView;
    private successView: ISuccessView;
    private basket: Basket;
    private modal: Modal;

    constructor(eventEmitter: EventEmitter, modal: Modal) {
        this.order = new Order();
        this.eventEmitter = eventEmitter;
        this.basket = new Basket();
        this.modal = modal;
        this.orderView = new OrderView(eventEmitter);
        this.contactsView = new ContactsView(eventEmitter);
        this.successView = new SuccessView();

        this.registerEvents();
    }

    private registerEvents(): void {
        // Обработка открытия формы заказа
        this.eventEmitter.on('order:open', () => this.showOrderForm());

        // Изменение способа оплаты
        this.eventEmitter.on('payment:change', (data: { method: string }) => {
            this.order.paymentMethod = data.method;
            this.eventEmitter.emit('order:validate');
        });

        // Изменение адреса доставки
        this.eventEmitter.on('address:change', (data: { value: string }) => {
            this.order.deliveryAddress = data.value;
            this.eventEmitter.emit('order:validate');
        });

        // Валидация формы заказа
        this.eventEmitter.on('order:validate', () => {
            const isValid = this.order.validatePayment();
            this.orderView.setValidState(isValid);
        });

        // Отправка формы заказа
        this.eventEmitter.on('order:submit', () => {
            if (this.order.validatePayment()) {
                this.modal.close();
                this.showContactsForm();
            }
        });

        // Отправка контактных данных
        this.eventEmitter.on('contacts:submit', (data: { email: string; phone: string }) => {
            this.order.email = data.email;
            this.order.phone = data.phone;
            
            if (this.order.validateContacts()) {
                this.completeOrder();
            }
        });

        // Закрытие окна успешного заказа
        this.eventEmitter.on('success:close', () => {
            this.modal.close();
            this.resetOrder();
        });
    }

    private showOrderForm(): void {
        const orderContent = this.orderView.render(this.order);
        this.modal.open(orderContent);
    }

    private showContactsForm(): void {
        const contactsContent = this.contactsView.render();
        this.modal.open(contactsContent);
    }

    private completeOrder(): void {
        const successContent = this.successView.render(this.basket.totalPrice);
        this.modal.open(successContent);
        
        // Настройка обработчика закрытия
        this.successView.getCloseButton().addEventListener('click', () => {
            this.eventEmitter.emit('success:close');
        });

        this.basket.clear();
        this.eventEmitter.emit('basket:clear');
    }

    private resetOrder(): void {
        this.order = new Order();
    }
}