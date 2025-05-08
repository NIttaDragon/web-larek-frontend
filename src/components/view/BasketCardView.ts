import { IProduct } from "../../types/models/Product";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

export class BasketCardView {
    private container: HTMLElement;
    private index: HTMLElement;
    private title: HTMLElement;
    private price: HTMLElement;
    private button: HTMLButtonElement;
    private eventEmitter: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        this.container = container;
        this.index = this.container.querySelector(SETTINGS.basket.itemIndex);
        this.title = this.container.querySelector(SETTINGS.basket.itemTitle);
        this.price = this.container.querySelector(SETTINGS.basket.itemPrice);
        this.button = this.container.querySelector(SETTINGS.basket.itemDeleteButton);
        this.eventEmitter = events;
    }

    render(product: IProduct, index: number): HTMLElement {
        if (this.index) this.index.textContent = String(index);
        if (this.title) this.title.textContent = product.title;
        if (this.price) this.price.textContent = `${product.price} синапсов`;
        this.button.addEventListener('click', () => {
            this.eventEmitter.emit('product:remove', { productId: product.id });
        });

        return this.container;
    }
}