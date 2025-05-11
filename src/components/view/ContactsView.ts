import { IContactsView , IContactForm} from "../../types/views/ContactsView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class ContactsView implements IContactsView {
    private eventEmitter: EventEmitter;
    public emailInput: HTMLInputElement;
    public phoneInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private errors: HTMLElement;
    private container: HTMLFormElement;

  constructor(container: HTMLFormElement, protected events: EventEmitter) {
    this.eventEmitter = events;
    this.container = container;
    this.emailInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.emailInput,this.container);
    this.submitButton = ensureElement<HTMLButtonElement>(SETTINGS.contacts.submitButton, this.container);
    this.errors = ensureElement<HTMLElement>(SETTINGS.contacts.errors, this.container);
    this.phoneInput = ensureElement<HTMLInputElement>(SETTINGS.contacts.phoneInput,this.container);
  }

  setValidState(isValid: boolean, error?: string): void {
    this.submitButton.disabled = !isValid;
    this.errors.textContent = error || '';
  }

  render(): HTMLFormElement {
    this.emailInput.addEventListener('input', () => {
        this.eventEmitter.emit('contacts:validate');
    });
    
    this.phoneInput.addEventListener('input', () => {
        this.eventEmitter.emit('contacts:validate');
    });

    this.container.addEventListener('submit', (event) => {
        event.preventDefault();
        this.eventEmitter.emit('contacts:submit', {
            email: this.emailInput.value,
            phone: this.phoneInput.value,
        });
    });
    return this.container;
  }

  resetForm() {
    this.container.reset();
  }
}
