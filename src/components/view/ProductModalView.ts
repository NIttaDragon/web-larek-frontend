import { IProductModalView } from "../../types/views/ProductModalView";
import { EventEmitter } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IProduct } from "../../types/models/Product";

export class ProductModalView implements IProductModalView {
    private eventEmitter: EventEmitter;
    private isInBasket: boolean = false;
    private product: IProduct;
    private buyButton: HTMLButtonElement;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    render(product: IProduct): HTMLElement {
        this.product = product;
        const productTemplate = ensureElement<HTMLTemplateElement>(SETTINGS.productTemplate);
        const productCard = cloneTemplate<HTMLElement>(productTemplate);

        const titleElement = ensureElement<HTMLElement>(SETTINGS.productSettings.title, productCard);
        const categoryElement = ensureElement<HTMLElement>(SETTINGS.productSettings.category, productCard);
        const imageElement = ensureElement<HTMLElement>(SETTINGS.productSettings.image, productCard) as HTMLImageElement;
        const priceElement = ensureElement<HTMLElement>(SETTINGS.productSettings.price, productCard);
        const descriptionElement = ensureElement<HTMLElement>(SETTINGS.productSettings.description, productCard);
        this.buyButton = ensureElement<HTMLButtonElement>(SETTINGS.productSettings.buyButton, productCard);

        titleElement.textContent = product.title;
        categoryElement.textContent = product.category;
        imageElement.src = product.image;
        if (product.price == null) {
            priceElement.textContent = `бесценно`;
            this.buyButton.setAttribute('disabled', '');
                this.setIsInBasket(false);
          } else {
            priceElement.textContent = `${product.price} синапсов`;
          }
        descriptionElement.textContent = product.description;

        console.log(product.category);

        switch (product.category) {
            case 'софт-скил':
              categoryElement.classList.add('card__category_soft');
              break;
            case 'дополнительное':
              categoryElement.classList.add('card__category_additional');
              break;
            case 'кнопка':
              categoryElement.classList.add('card__category_button');
              break;
            case 'хард-скил':
              categoryElement.classList.add('card__category_hard');
              break;
            default:
              categoryElement.classList.add('card__category_other');
          }

        this.updateButtonState();
        return productCard;
    }

    setEventListener(): void {
        this.buyButton?.addEventListener('click', () => {
            if (this.isInBasket){
                this.setIsInBasket(false);
                this.eventEmitter.emit('product:remove', {productId: this.product.id});                 
            } else {
                this.setIsInBasket(true);
                this.eventEmitter.emit('product:add', this.product);
            }
            this.updateButtonState();
        });
    }

    setIsInBasket(isInBasket: boolean): void {
        this.isInBasket = isInBasket;
        this.updateButtonState();
    }

    private updateButtonState(): void {
        if (!this.buyButton) return;
        this.buyButton.textContent = this.isInBasket ? 'Удалить' : 'В корзину';
    }
}