import { IOrderView } from "../../types/views/OrderView";
import { EventEmitter } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class OrderView implements IOrderView {
    private eventEmitter: EventEmitter;
    private paymentButtons: HTMLElement;
    private addressInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private errors: HTMLElement;
    private container: HTMLFormElement;
    private onlineButton: HTMLButtonElement;
    private cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, eventEmitter: EventEmitter) {
        this.container = container;
        this.eventEmitter = eventEmitter;
    }

    render(): HTMLElement {
        this.paymentButtons = ensureElement<HTMLElement>(SETTINGS.order.paymentButtons, this.container);
        this.addressInput = ensureElement<HTMLInputElement>(SETTINGS.order.addressInput, this.container);
        this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.order.submitButton, this.container);
        this.errors = ensureElement<HTMLElement>(SETTINGS.order.errors, this.container);
        this.onlineButton = ensureElement<HTMLButtonElement>(SETTINGS.order.paymentButtonOnline, this.paymentButtons);
        this.cashButton = ensureElement<HTMLButtonElement>(SETTINGS.order.paymentButtonCash, this.paymentButtons);

        return this.container;
    }

    setListeners(): void {
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

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.eventEmitter.emit('order:submit');
        });
    }

    setPaymentMethod(method: string): void {
        this.onlineButton.classList.toggle(SETTINGS.order.buttonActiveClass, method === 'card');
        this.cashButton.classList.toggle(SETTINGS.order.buttonActiveClass, method === 'cash');
    }

    setAddress(value: string): void {
        this.addressInput.value = value;
    }

    setValidState(isValid: boolean, error?: string): void {
        this.submitButton.disabled = !isValid;
        this.errors.textContent = isValid ? '' : (error || 'Заполните все поля');
    }

    resetForm() {
        this.container.reset();
        this.onlineButton.classList.remove(SETTINGS.order.buttonActiveClass);
        this.cashButton.classList.remove(SETTINGS.order.buttonActiveClass);
    }
}