import { ISuccessView } from "../../types/views/SuccessView";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class SuccessView implements ISuccessView {
    private content: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor() {
        // Инициализация элементов, которые будут использоваться в render
        this.content = document.createElement('div');
        this.closeButton = document.createElement('button');
    }

    render(totalPrice: number): HTMLElement {
        const template = document.querySelector<HTMLTemplateElement>(SETTINGS.successTemplate);
        if (!template) {
            throw new Error('Шаблон успешного заказа не найден');
        }

        const successElement = cloneTemplate<HTMLElement>(template);
        this.content = successElement;

        const priceElement = ensureElement<HTMLElement>(SETTINGS.success.description, this.content);
        priceElement.textContent = `Списано ${totalPrice} синапсов`;

        this.closeButton = ensureElement<HTMLButtonElement>(SETTINGS.success.closeButton, this.content);
        
        // Возвращаем готовый элемент, управление модальным окном будет в контроллере
        return this.content;
    }

    getCloseButton(): HTMLButtonElement {
        return this.closeButton;
    }
}