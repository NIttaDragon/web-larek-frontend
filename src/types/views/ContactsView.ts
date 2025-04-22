import { EventEmitter } from "../../components/base/events";
import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export interface IContactsView {
  render(): void;
  openModal(): void;
  closeModal(): void;
}

export class ContactsView implements IContactsView {
  private modal: HTMLElement;
  private content: HTMLElement;
  private form: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
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
      const template = document.querySelector<HTMLTemplateElement>(SETTINGS.contactsTemplate);
      if (!template) {
          throw new Error('Шаблон не найден');
      }
      const contacts = template.content.cloneNode(true) as HTMLElement;
      this.content.appendChild(contacts);

      this.form = ensureElement<HTMLFormElement>(SETTINGS.contacts.form, this.content);
      this.emailInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.emailInput, this.form);
      this.phoneInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.phoneInput, this.form);
      this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.contacts.submitButton, this.form);
      this.errors = ensureElement<HTMLElement>(SETTINGS.contacts.errors, this.form);

      this.submitButton.disabled = true;

      this.emailInput.addEventListener('input', this.validate.bind(this));
      this.phoneInput.addEventListener('input', this.validate.bind(this));

      this.form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (this.validate()) {
              this.eventEmitter.emit('contacts:submit', {
                  email: this.emailInput.value,
                  phone: this.phoneInput.value,
              });
              this.closeModal();
          }
      });
  }

  private validate(): boolean {
      const isValid = this.emailInput.value.length > 0 && this.phoneInput.value.length > 0;
      this.submitButton.disabled = !isValid;

      if (!isValid) {
          this.errors.textContent = 'Заполните все поля';
      } else {
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
