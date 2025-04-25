import { IProductModalView } from "../../types/views/ProductModalView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IProduct } from "../../types/models/Product";

export class ProductModalView implements IProductModalView {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
      this.eventEmitter = eventEmitter;
  }

  render(product: IProduct): HTMLElement {
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
    });

    return productCard;
}
}