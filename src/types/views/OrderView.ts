import { EventEmitter } from "../../components/base/events";
import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export interface IOrderView {
  render(): void;
  openModal(): void;
  closeModal(): void;
}

export class OrderView implements IOrderView {
  private modal: HTMLElement;
  private content: HTMLElement;
  private form: HTMLFormElement;
  private paymentButtons: HTMLElement;
  private addressInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private errors: HTMLElement;
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
      this.modal = ensureElement<HTMLElement>(SETTINGS.modal.container);
      this.content = ensureElement<HTMLElement>(SETTINGS.modal.content, this.modal);
      this.eventEmitter = eventEmitter;
  }

  render(): void {
    this.content.innerHTML = '';
    const template = document.querySelector<HTMLTemplateElement>(SETTINGS.orderTemplate);
    if (!template) {
        throw new Error('Шаблон не найден');
    }
    const order = template.content.cloneNode(true) as HTMLElement;
    this.content.appendChild(order);

    this.form = ensureElement<HTMLFormElement>(SETTINGS.order.form, this.content);
    this.paymentButtons = ensureElement<HTMLElement>(SETTINGS.order.paymentButtons, this.form);
    this.addressInput = ensureElement<HTMLInputElement>(SETTINGS.order.addressInput, this.form);
    this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.order.submitButton, this.form);
    this.errors = ensureElement<HTMLElement>(SETTINGS.order.errors, this.form);

    this.submitButton.disabled = true;

    this.paymentButtons.addEventListener('click', this.validate.bind(this));
    this.addressInput.addEventListener('input', this.validate.bind(this));
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (this.validate()) {
            let paymentMethod: string | null = null;

            const paymentButtonOnline = this.form.querySelector(SETTINGS.order.paymentButtonOnline);
            const paymentButtonCash = this.form.querySelector(SETTINGS.order.paymentButtonCash);

            if (paymentButtonOnline?.classList.contains(SETTINGS.order.buttonActiveClass)) {
                paymentMethod = 'card';
              } else if (paymentButtonCash?.classList.contains(SETTINGS.order.buttonActiveClass)) {
                paymentMethod = 'cash';
            }

            this.eventEmitter.emit('order:submit', {
                paymentMethod,
                deliveryAddress: this.addressInput.value,
            });
            this.closeModal();
        }
    });

    const paymentButtonOnline = this.form.querySelector(SETTINGS.order.paymentButtonOnline);
    const paymentButtonCash = this.form.querySelector(SETTINGS.order.paymentButtonCash);

    paymentButtonOnline?.addEventListener('click', () => {
        paymentButtonOnline.classList.add(SETTINGS.order.buttonActiveClass);
        paymentButtonCash?.classList.remove(SETTINGS.order.buttonActiveClass);
        this.validate();
    });

    paymentButtonCash?.addEventListener('click', () => {
        paymentButtonCash.classList.add(SETTINGS.order.buttonActiveClass);
        paymentButtonOnline?.classList.remove(SETTINGS.order.buttonActiveClass);
        this.validate();
    });
  }

  private validate(): boolean {
    const isAddressValid = this.addressInput.value.length > 0;

    let isPaymentMethodSelected: boolean = false;

    const paymentButtonOnline = this.form.querySelector(SETTINGS.order.paymentButtonOnline);
    const paymentButtonCash = this.form.querySelector(SETTINGS.order.paymentButtonCash);

    if (paymentButtonOnline?.classList.contains('button_alt') || paymentButtonCash?.classList.contains('button_alt')) {
        isPaymentMethodSelected = true;
    }

    const isValid = isAddressValid && isPaymentMethodSelected;
    this.submitButton.disabled = !isValid;

    if (!isAddressValid) {
        this.errors.textContent = 'Заполните адрес доставки';
    } else if (!isPaymentMethodSelected) {
        this.errors.textContent = 'Выберите способ оплаты';
    }
    else {
        this.errors.textContent = '';
    }

    return isValid;
  }

  openModal(): void {
      this.modal.classList.add(SETTINGS.modal.modalActiveClass);
  }

  closeModal(): void {
      this.modal.classList.remove(SETTINGS.modal.modalActiveClass);
  }
}
