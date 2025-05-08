import { EventEmitter } from "../base/events";
import { IBasketController } from "../../types/controllers/BasketController";
import { Basket } from "../model/Basket";
import { IProduct } from "../../types/models/Product";
import { IBasketView } from "../../types/views/BasketView";
import { BasketView } from "../view/BasketView";
import { Modal } from "../common/modal";
import { SETTINGS } from "../../utils/constants";
import { ModalController } from "./modalController";

export class BasketController {
  private basket: Basket;
  private basketView: BasketView;
  private events: EventEmitter;
  private modalController: ModalController;

  constructor(basket: Basket, basketView: BasketView, events: EventEmitter, modalController: ModalController) {
      this.basket = basket;
      this.basketView = basketView;
      this.events = events;
      this.modalController = modalController;

      this.events.on('product:add', this.handleProductAdd.bind(this));
      this.events.on('product:remove', this.handleProductRemove.bind(this));
      this.events.on('basket:open', this.handleBasketOpen.bind(this));
  }

  handleProductAdd(product: IProduct) {
      this.basket.addItem(product);
      this.updateBasketCounter();
      this.events.emit('basket:changed'); // Сигнализируем об изменении корзины
    }

  handleProductRemove(data: { productId: string }) {
      this.basket.removeItem(data.productId);
      this.updateBasketCounter();
      this.events.emit('basket:changed'); // Сигнализируем об изменении корзины
  }

  handleBasketOpen() {
      this.modalController.openModal(this.basketView.render(this.basket));
  }

  updateBasketCounter() {
      const count = this.basket.items.length;
      // Обновите счетчик в PageView или другом компоненте, отображающем счетчик
      this.events.emit('basket:count', {count})
  }
}