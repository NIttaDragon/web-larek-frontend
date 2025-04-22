import { EventEmitter } from "../../components/base/events";
import { Basket, IBasket } from "../models/Basket";
import { IProduct } from "../models/Product";
import { BasketView, IBasketView } from "../views/BasketView";

export interface IBasketController {
  addToBasket(product: IProduct): void;
  removeFromBasket(productId: string): void;
  showBasket(): void;
}

export class BasketController implements IBasketController {
  private basket: Basket;
  private eventEmitter: EventEmitter;
  private basketView: IBasketView;

  constructor(eventEmitter: EventEmitter) {
      this.basket = new Basket();
      this.eventEmitter = eventEmitter;
      this.basketView = new BasketView(eventEmitter);

      this.eventEmitter.on('product:add', this.addToBasket.bind(this));
      this.eventEmitter.on('product:remove', this.removeFromBasket.bind(this));
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
      this.basketView.render(this.basket);
      this.basketView.openModal();
  }

  private updateBasketIcon(): void {
      const basketCounter = document.querySelector('.header__basket-counter');
      if (basketCounter) {
          basketCounter.textContent = String(this.basket.items.length);
      }
  }
}
