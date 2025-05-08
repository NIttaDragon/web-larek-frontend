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
    private container: HTMLElement;

  constructor(container: HTMLElement, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.container = container;
    // console.log(this.container);
    // console.log(this.container.querySelector('form[name="contacts"]'));
    // this.form = ensureElement<HTMLFormElement>(SETTINGS.contacts.form, this.container);
    this.emailInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.emailInput,this.container);
    this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.contacts.submitButton, this.container);
    this.errors = ensureElement<HTMLElement>(SETTINGS.contacts.errors, this.container);
  }

  render(): HTMLElement {
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

    return this.container;
  }
}
