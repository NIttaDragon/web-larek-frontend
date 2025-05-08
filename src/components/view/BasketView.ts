import { IBasketView } from "../../types/views/BasketView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IBasket } from "../../types/models/Basket";
import { BasketCardView } from "./BasketCardView";

export class BasketView implements IBasketView {
    private eventEmitter: EventEmitter;
    private container: HTMLElement;
    private list: HTMLElement;
    private total: HTMLElement;
    private button: HTMLElement;

    constructor(container: HTMLElement, eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
        this.container = container;
        this.list = this.container.querySelector(SETTINGS.basket.list);
        this.total = this.container.querySelector(SETTINGS.basket.totalPrice);
        this.button = this.container.querySelector(SETTINGS.basket.orderButton);
        
    }

    render(basket: IBasket): HTMLElement {
        this.list.innerHTML = '';
        if (basket.items.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = 'Корзина пуста';
            this.list.appendChild(emptyMessage);
            this.button.setAttribute('disabled','');
        } else {
        basket.items.forEach((product, index) => {
            this.button.removeAttribute('disabled');
            let basketCard = new BasketCardView(cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.basketItemTemplate)), this.eventEmitter);
            const itemElement = basketCard.render(product, index + 1);
            const deleteButton = itemElement.querySelector(SETTINGS.basket.itemDeleteButton);
            
            this.list.appendChild(itemElement);
        });
        this.button.addEventListener('click', () => {
            this.eventEmitter.emit('order:open');
        });
        }

        this.total.textContent = `${basket.totalPrice} синапсов`;

        return this.container;
    }
}