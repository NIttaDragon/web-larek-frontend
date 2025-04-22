import { IProduct } from "../models/Product";
import { EventEmitter } from "../../components/base/events";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export interface IProductModalView {
  render(product: IProduct): void;
  openModal(): void;
  closeModal(): void;
}

export class ProductModalView implements IProductModalView {
  private modal: HTMLElement;
  private content: HTMLElement;
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
      this.modal = ensureElement<HTMLElement>(SETTINGS.modal.container);
      this.content = ensureElement<HTMLElement>(SETTINGS.modal.content, this.modal);
      this.eventEmitter = eventEmitter;
  }

  render(product: IProduct): void {
      this.content.innerHTML = '';
      const productTemplate = document.querySelector<HTMLTemplateElement>(SETTINGS.productTemplate);
      if (!productTemplate) {
          throw new Error(`Template with ID "${SETTINGS.productTemplate}" not found.`);
      }
      const productCard = cloneTemplate<HTMLElement>(productTemplate);

      const titleElement = productCard.querySelector(SETTINGS.productSettings.title);
      const categoryElement = productCard.querySelector(SETTINGS.productSettings.category);
      const imageElement = productCard.querySelector(SETTINGS.productSettings.image) as HTMLImageElement;
      const priceElement = productCard.querySelector(SETTINGS.productSettings.price);
      const descriptionElement = productCard.querySelector(SETTINGS.productSettings.description);
      const buyButton = productCard.querySelector(SETTINGS.productSettings.buyButton);

      if (titleElement) titleElement.textContent = product.name;
      if (categoryElement) categoryElement.textContent = product.category;
      if (imageElement) imageElement.src = product.image;
      if (priceElement) priceElement.textContent = `${product.price} синапсов`;
      if (descriptionElement) descriptionElement.textContent = product.description;

      buyButton?.addEventListener('click', () => {
          this.eventEmitter.emit('product:add', product);
          this.closeModal();
      });

      this.content.appendChild(productCard);
  }

  openModal(): void {
      this.modal.classList.add(SETTINGS.modal.modalActiveClass);
  }

  closeModal(): void {
      this.modal.classList.remove(SETTINGS.modal.modalActiveClass);
  }
}
