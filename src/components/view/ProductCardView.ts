import { IProductCardView } from "../../types/views/ProductCardView";
import { IProduct } from "../../types/models/Product";
import { SETTINGS } from "../../utils/constants";
import { cloneTemplate, ensureElement } from "../../utils/utils";

export class ProductCardView implements IProductCardView {
  render(product: IProduct): HTMLElement {
      const cardTemplate = ensureElement<HTMLTemplateElement>(SETTINGS.cardTemplate);
      const card = cloneTemplate<HTMLElement>(cardTemplate);

      const titleElement = ensureElement<HTMLElement>('.card__title', card);
      const categoryElement = ensureElement<HTMLElement>(SETTINGS.productSettings.category, card);
      const imageElement = ensureElement<HTMLElement>(SETTINGS.productSettings.image, card) as HTMLImageElement;
      const priceElement = ensureElement<HTMLElement>(SETTINGS.productSettings.price, card);

      titleElement.textContent = product.title;
      categoryElement.textContent = product.category;
      imageElement.src = product.image;
      priceElement.textContent = `${product.price} синапсов`;

      return card;
  }
}
