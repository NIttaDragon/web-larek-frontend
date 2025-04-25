import { IProductCardView } from "../../types/views/ProductCardView";
import { IProduct } from "../../types/models/Product";
import { SETTINGS } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";

export class ProductCardView implements IProductCardView {
  render(product: IProduct): HTMLElement {
      const cardTemplate = document.querySelector<HTMLTemplateElement>(SETTINGS.cardTemplate);
      if (!cardTemplate) {
          throw new Error(`Template with ID "${SETTINGS.cardTemplate}" not found.`);
      }
      const card = cloneTemplate<HTMLElement>(cardTemplate);

      const titleElement = card.querySelector(SETTINGS.cardSettings.title);
      const categoryElement = card.querySelector(SETTINGS.cardSettings.category);
      const imageElement = card.querySelector(SETTINGS.cardSettings.image) as HTMLImageElement;
      const priceElement = card.querySelector(SETTINGS.cardSettings.price);

      if (titleElement) titleElement.textContent = product.name;
      if (categoryElement) categoryElement.textContent = product.category;
      if (imageElement) imageElement.src = product.image;
      if (priceElement) priceElement.textContent = `${product.price} синапсов`;

      return card;
  }
}
