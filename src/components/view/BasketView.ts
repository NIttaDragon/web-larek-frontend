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

    render(basket: IBasket, basketCardArray: HTMLElement[]): HTMLElement {
        this.list.innerHTML = '';
        if (basket.items.length === 0) {
            this.button.setAttribute('disabled','');
        } else {
            this.button.removeAttribute('disabled');
            this.button.addEventListener('click', () => {
                this.eventEmitter.emit('order:open');
            });
        }
        this.list.replaceChildren(...basketCardArray);

        this.total.textContent = `${basket.totalPrice} синапсов`;

        return this.container;
    }
}