import { IOrderView } from "../../types/views/OrderView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IOrder } from "../../types/models/Order";

export class OrderView implements IOrderView {
    private eventEmitter: EventEmitter;
    private form: HTMLFormElement;
    private paymentButtons: HTMLElement;
    private addressInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private errors: HTMLElement;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    render(order: IOrder): HTMLElement {
        const template = document.querySelector<HTMLTemplateElement>(SETTINGS.orderTemplate);
        if (!template) {
            throw new Error('Шаблон не найден');
        }
        const orderElement = cloneTemplate<HTMLElement>(template);

        // Инициализация элементов формы
        this.form = ensureElement<HTMLFormElement>(SETTINGS.order.form, orderElement);
        this.paymentButtons = ensureElement<HTMLElement>(SETTINGS.order.paymentButtons, this.form);
        this.addressInput = ensureElement<HTMLInputElement>(SETTINGS.order.addressInput, this.form);
        this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.order.submitButton, this.form);
        this.errors = ensureElement<HTMLElement>(SETTINGS.order.errors, this.form);

        // Обработчики событий
        this.paymentButtons.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLButtonElement;
            if (target.name === 'card' || target.name === 'cash') {
                this.eventEmitter.emit('payment:change', { method: target.name });
                this.eventEmitter.emit('order:validate');
            }
        });

        this.addressInput.addEventListener('input', () => {
            this.eventEmitter.emit('address:change', { value: this.addressInput.value });
            this.eventEmitter.emit('order:validate');
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.eventEmitter.emit('order:submit');
        });

        return orderElement;
    }

    // Методы для обновления состояния формы
    setPaymentMethod(method: string): void {
        const onlineButton = ensureElement<HTMLButtonElement>(SETTINGS.order.paymentButtonOnline, this.paymentButtons);
        const cashButton = ensureElement<HTMLButtonElement>(SETTINGS.order.paymentButtonCash, this.paymentButtons);

        onlineButton.classList.toggle(SETTINGS.order.buttonActiveClass, method === 'card');
        cashButton.classList.toggle(SETTINGS.order.buttonActiveClass, method === 'cash');
    }

    setAddress(value: string): void {
        this.addressInput.value = value;
    }

    setValidState(isValid: boolean, error?: string): void {
        this.submitButton.disabled = !isValid;
        this.errors.textContent = isValid ? '' : (error || 'Заполните все поля');
    }
}