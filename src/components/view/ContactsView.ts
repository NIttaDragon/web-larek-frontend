import { IContactsView } from "../../types/views/ContactsView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class ContactsView implements IContactsView {
    private eventEmitter: EventEmitter;
    private form: HTMLFormElement;
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private errors: HTMLElement;

  constructor(eventEmitter: EventEmitter) {
      this.eventEmitter = eventEmitter;
  }

  render(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(SETTINGS.contactsTemplate);
    if (!template) {
        throw new Error('Шаблон не найден');
    }
    const contacts = cloneTemplate<HTMLElement>(template);

    this.form = ensureElement<HTMLFormElement>(SETTINGS.contacts.form, contacts);
    this.emailInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.emailInput, this.form);
    this.phoneInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.phoneInput, this.form);
    this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.contacts.submitButton, this.form);
    this.errors = ensureElement<HTMLElement>(SETTINGS.contacts.errors, this.form);

    this.emailInput.addEventListener('input', () => {
        this.eventEmitter.emit('contacts:validate');
    });
    
    this.phoneInput.addEventListener('input', () => {
        this.eventEmitter.emit('contacts:validate');
    });

    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.eventEmitter.emit('contacts:submit', {
            email: this.emailInput.value,
            phone: this.phoneInput.value,
        });
    });

    return contacts;
  }
}
