import { IBasket } from "../models/Basket";
import { EventEmitter } from "../../components/base/events";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IProduct } from "../models/Product";
import { SETTINGS } from "../../utils/constants";

export interface IBasketView {
  render(basket: IBasket): void;
  openModal(): void;
  closeModal(): void;
  renderBasketItem(product: IProduct, index: number): HTMLElement;
}

export class BasketView implements IBasketView {
  private modal: HTMLElement;
  private content: HTMLElement;
  private list: HTMLElement;
  private totalPrice: HTMLElement;
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
      this.modal = ensureElement<HTMLElement>(SETTINGS.modal.container);
      this.content = ensureElement<HTMLElement>(SETTINGS.modal.content, this.modal);
      this.eventEmitter = eventEmitter;
  }

  render(basket: IBasket): void {
      this.content.innerHTML = '';
      const basketTemplate = document.querySelector<HTMLTemplateElement>(SETTINGS.basketTemplate);
      if (!basketTemplate) {
          throw new Error('Корзина не найдена');
      }
      const basketElement = cloneTemplate<HTMLElement>(basketTemplate);

      this.list = ensureElement<HTMLElement>(SETTINGS.basket.list, basketElement);
      this.totalPrice = ensureElement<HTMLElement>(SETTINGS.basket.totalPrice, basketElement);

      this.list.innerHTML = '';
      basket.items.forEach((product, index) => {
          const itemElement = this.renderBasketItem(product, index + 1);
          this.list.appendChild(itemElement);
      });

      this.totalPrice.textContent = `${basket.totalPrice} синапсов`;
      this.content.appendChild(basketElement);

      const orderButton = ensureElement<HTMLButtonElement>(SETTINGS.basket.orderButton, basketElement);
      orderButton.addEventListener('click', () => {
          this.closeModal();
          this.eventEmitter.emit('order:open');
      });
  }

  renderBasketItem(product: IProduct, index: number): HTMLElement {
      const cardTemplate = document.querySelector<HTMLTemplateElement>(SETTINGS.basketItemTemplate);
      if (!cardTemplate) {
          throw new Error('Шаблон карточки не найден');
      }
      const card = cloneTemplate<HTMLElement>(cardTemplate);

      const indexElement = card.querySelector(SETTINGS.basket.itemIndex);
      const titleElement = card.querySelector(SETTINGS.basket.itemTitle);
      const priceElement = card.querySelector(SETTINGS.basket.itemPrice);
      const deleteButton = card.querySelector(SETTINGS.basket.itemDeleteButton);

      if (indexElement) indexElement.textContent = String(index);
      if (titleElement) titleElement.textContent = product.name;
      if (priceElement) priceElement.textContent = `${product.price} синапсов`;

      deleteButton?.addEventListener('click', () => {
          this.eventEmitter.emit('product:remove', { productId: product.id });
          card.remove();
      });

      return card;
  }

  openModal(): void {
      this.modal.classList.add(SETTINGS.modal.modalActiveClass);
  }

  closeModal(): void {
      this.modal.classList.remove(SETTINGS.modal.modalActiveClass);
  }
}
