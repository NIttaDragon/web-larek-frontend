import { ISuccessView } from "../../types/views/SuccessView";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class SuccessView implements ISuccessView {
    private content: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor() {
        this.content = document.createElement('div');
        this.closeButton = document.createElement('button');
    }

    render(totalPrice: number): HTMLElement {
        const template = cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.successTemplate));
        this.content = template;

        const priceElement = ensureElement<HTMLElement>(SETTINGS.success.description, this.content);
        priceElement.textContent = `Списано ${totalPrice} синапсов`;

        this.closeButton = ensureElement<HTMLButtonElement>(SETTINGS.success.closeButton, this.content);
        
        return this.content;
    }

    getCloseButton(): HTMLButtonElement {
        return this.closeButton;
    }
}