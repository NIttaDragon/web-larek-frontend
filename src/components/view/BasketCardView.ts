import { IProduct } from "../../types/models/Product";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export class BasketCardView {
    private template: HTMLTemplateElement;

    constructor() {
        this.template = ensureElement<HTMLTemplateElement>(SETTINGS.basketItemTemplate);
    }

    render(product: IProduct, index: number): HTMLElement {
        const card = cloneTemplate<HTMLElement>(this.template);

        const indexElement = card.querySelector(SETTINGS.basket.itemIndex);
        const titleElement = card.querySelector(SETTINGS.basket.itemTitle);
        const priceElement = card.querySelector(SETTINGS.basket.itemPrice);
        const deleteButton = card.querySelector(SETTINGS.basket.itemDeleteButton);

        if (indexElement) indexElement.textContent = String(index);
        if (titleElement) titleElement.textContent = product.name;
        if (priceElement) priceElement.textContent = `${product.price} синапсов`;

        return card;
    }
}