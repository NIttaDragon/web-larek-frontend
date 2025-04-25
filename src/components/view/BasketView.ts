import { IBasketView } from "../../types/views/BasketView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IBasket } from "../../types/models/Basket";
import { BasketCardView } from "./BasketCardView";

export class BasketView implements IBasketView {
    private eventEmitter: EventEmitter;
    private basketCard: BasketCardView;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
        this.basketCard = new BasketCardView();
    }

    render(basket: IBasket): HTMLElement {
        const basketTemplate = document.querySelector<HTMLTemplateElement>(SETTINGS.basketTemplate);
        if (!basketTemplate) {
            throw new Error('Корзина не найдена');
        }
        const basketElement = cloneTemplate<HTMLElement>(basketTemplate);

        const list = ensureElement<HTMLElement>(SETTINGS.basket.list, basketElement);
        const totalPrice = ensureElement<HTMLElement>(SETTINGS.basket.totalPrice, basketElement);

        list.innerHTML = '';
        basket.items.forEach((product, index) => {
            const itemElement = this.basketCard.render(product, index + 1);
            const deleteButton = itemElement.querySelector(SETTINGS.basket.itemDeleteButton);
            deleteButton?.addEventListener('click', () => {
                this.eventEmitter.emit('product:remove', { productId: product.id });
            });
            list.appendChild(itemElement);
        });

        totalPrice.textContent = `${basket.totalPrice} синапсов`;

        const orderButton = ensureElement<HTMLButtonElement>(SETTINGS.basket.orderButton, basketElement);
        orderButton.addEventListener('click', () => {
            this.eventEmitter.emit('order:open');
        });

        return basketElement;
    }
}