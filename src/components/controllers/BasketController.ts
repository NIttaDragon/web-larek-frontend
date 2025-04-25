import { EventEmitter } from "../base/events";
import { IBasketController } from "../../types/controllers/BasketController";
import { Basket } from "../model/Basket";
import { IProduct } from "../../types/models/Product";
import { IBasketView } from "../../types/views/BasketView";
import { BasketView } from "../view/BasketView";
import { Modal } from "../view/Modal";
import { SETTINGS } from "../../utils/constants";


export class BasketController implements IBasketController {
  private basket: Basket;
  private eventEmitter: EventEmitter;
  private basketView: IBasketView;
  private modal: Modal;

  constructor(eventEmitter: EventEmitter) {
    this.basket = new Basket();
    this.eventEmitter = eventEmitter;
    this.basketView = new BasketView(eventEmitter);
    this.modal = new Modal();

    this.eventEmitter.on('product:add', this.addToBasket.bind(this));
    this.eventEmitter.on('product:remove', this.removeFromBasket.bind(this));
    this.eventEmitter.on('basket:open', () => this.showBasket());
  }

  addToBasket(product: IProduct): void {
    this.basket.addItem(product);
    this.updateBasketIcon();
  }

  removeFromBasket(productId: string): void {
    this.basket.removeItem(productId);
    this.updateBasketIcon();
  }

  showBasket(): void {
    const basketContent = this.basketView.render(this.basket);
    this.modal.open(basketContent);
}

  private updateBasketIcon(): void {
      const basketCounter = document.querySelector(SETTINGS.basketCounter);
      if (basketCounter) {
          basketCounter.textContent = String(this.basket.items.length);
      }
  }
}
