import { Order } from "../model/Order";
import { EventEmitter } from "../base/events";
import { Basket } from "../model/Basket";
import { OrderView } from "../view/OrderView";
import { ContactsView } from "../view/ContactsView";
import { SuccessView } from "../view/SuccessView";
import { ModalController } from "./modalController";
import { ProductAPI } from "../productApi";

export class OrderController {
    private order: Order;
    private orderView: OrderView;
    private contactsView: ContactsView;
    private events: EventEmitter;
    private api: ProductAPI;
    private modalController: ModalController;
    private basket: Basket;

    constructor(order: Order, orderView: OrderView, contactsView: ContactsView, events: EventEmitter, api: ProductAPI, modalController: ModalController, basket: Basket) {
        this.order = order;
        this.orderView = orderView;
        this.contactsView = contactsView;
        this.events = events;
        this.api = api;
        this.modalController = modalController;
        this.basket = basket;

        this.events.on('order:open', this.handleOrderOpen.bind(this));
        this.events.on('payment:change', this.handlePaymentChange.bind(this));
        this.events.on('address:change', this.handleAddressChange.bind(this));
        this.events.on('contacts:submit', this.handleContactsSubmit.bind(this));
        this.events.on('order:submit', this.handleOrderSubmit.bind(this));
        this.events.on('contacts:validate', this.handleContactsValidate.bind(this));
        this.events.on('order:validate', this.handleOrderValidate.bind(this));
    }

    handleOrderOpen() {
        this.modalController.openModal(this.orderView.render());
        this.orderView.setListeners();
    }

    handlePaymentChange(data: { method: string }) {
        this.order.payment = data.method;
        this.orderView.setPaymentMethod(data.method);
    }

    handleAddressChange(data: { value: string }) {
        this.order.address = data.value;
        this.orderView.setAddress(data.value);
    }

    handleOrderSubmit() {
        this.order.payment 
        this.modalController.openModal(this.contactsView.render());
    }

    handleContactsValidate() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        const isEmailValid = emailRegex.test(this.contactsView.emailInput.value);
        const isPhoneValid = phoneRegex.test(this.contactsView.phoneInput.value);
        const isValid = isEmailValid && isPhoneValid;

        this.contactsView.setValidState(isValid, !isEmailValid ? 'Некорректный email' : (!isPhoneValid ? 'Некорректный телефон' : ''));
    }

    handleOrderValidate() {
        const isValid = (this.order.payment !== null && this.order.address !== null && this.order.address !== '');
        this.orderView.setValidState(isValid);
    }

    handleContactsSubmit(data: { email: string, phone: string }) {
        this.order.email = data.email;
        this.order.phone = data.phone;
        this.handleOrderSubmitConfirmed();
    }

    async handleOrderSubmitConfirmed() {
        try {
            const totalPrice = this.basket.totalPrice;
        if (totalPrice>0) {
            this.order.total = totalPrice;
            this.order.items = [];
            this.basket.items.forEach(item => {
                this.order.items.push(item.id);
            });
            
            await this.api.orderProducts(this.order);
            this.basket.clear();
            this.events.emit('basket:changed'); 
            this.modalController.closeModal();
            this.orderView.resetForm();
            this.contactsView.resetForm();

            const successView = new SuccessView(this.events, this.modalController);
            this.modalController.openModal(successView.render(totalPrice));
        }
        } catch (error) {
            let errorView = document.createElement('p');
            errorView.textContent = 'Ошибка при оформлении заказа:' + error;
            this.modalController.openModal(errorView);
            console.error("Ошибка при оформлении заказа:", error);
        }
    }
}