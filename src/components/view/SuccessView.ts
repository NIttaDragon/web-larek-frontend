import { ISuccessView } from "../../types/views/SuccessView";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import { ModalController } from "../controllers/modalController";

export class SuccessView implements ISuccessView {
    private content: HTMLElement;
    private closeButton: HTMLButtonElement;
    private events: EventEmitter;
    private modalController: ModalController;

    constructor(event: EventEmitter, modal: ModalController) {
        this.content = document.createElement('div');
        this.closeButton = document.createElement('button');
        this.events = event;
        this.modalController = modal;
    }

    render(totalPrice: number): HTMLElement {
        const template = cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.successTemplate));
        this.content = template;

        const priceElement = ensureElement<HTMLElement>(SETTINGS.success.description, this.content);
        priceElement.textContent = `Списано ${totalPrice} синапсов`;

        this.closeButton = ensureElement<HTMLButtonElement>(SETTINGS.success.closeButton, this.content);

        this.closeButton.addEventListener('click', () => {
            this.modalController.closeModal();
            // this.events.emit('modal:close');
        });
        
        return this.content;
    }

    getCloseButton(): HTMLButtonElement {
        return this.closeButton;
    }
}