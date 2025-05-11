import { EventEmitter } from "../base/events";
import { IBasketController } from "../../types/controllers/BasketController";
import { Basket } from "../model/Basket";
import { IProduct } from "../../types/models/Product";
import { IBasketView } from "../../types/views/BasketView";
import { BasketView } from "../view/BasketView";
import { Modal } from "../common/modal";
import { SETTINGS } from "../../utils/constants";
import { ModalController } from "./modalController";
import { BasketCardView } from "../view/BasketCardView";
import { ensureElement, cloneTemplate } from "../../utils/utils";

export class BasketController {
  private basket: Basket;
  private basketView: BasketView;
  private events: EventEmitter;
  private modalController: ModalController;
  private basketCard: BasketCardView;
//   private basketCardArray: HTMLElement;
  private basketRowTemplate: HTMLTemplateElement;

  constructor(basket: Basket, basketView: BasketView, events: EventEmitter, modalController: ModalController) {
    this.basket = basket;
    this.basketView = basketView;
    this.events = events;
    this.modalController = modalController;
    this.basketRowTemplate = ensureElement<HTMLTemplateElement>(SETTINGS.basketItemTemplate);

    this.events.on('product:add', this.handleProductAdd.bind(this));
    this.events.on('product:remove', this.handleProductRemove.bind(this));
    this.events.on('basket:open', this.handleBasketOpen.bind(this));
  }

  handleProductAdd(product: IProduct) {
    this.basket.addItem(product);
    this.updateBasketCounter();
    this.events.emit('basket:changed'); 
    }

  handleProductRemove(data: { productId: string }) {
    this.basket.removeItem(data.productId);
    this.updateBasketCounter();
    this.events.emit('basket:changed'); 
  }

  handleBasketOpen() {    
    this.modalController.openModal(this.basketView.render(this.basket, this.createBasketRows()));
    }

  updateBasketCounter() {
    const count = this.basket.items.length;
    this.events.emit('basket:count', {count})
  }

  createBasketRows(): HTMLElement[] {
    let basketCardArray: HTMLElement[] = [];
    if (this.basket.items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Корзина пуста';
        basketCardArray.push(emptyMessage);
    } else {
        this.basket.items.forEach((product, index) => {
            this.basketRowTemplate = ensureElement<HTMLTemplateElement>(SETTINGS.basketItemTemplate);
            let basketCard = new BasketCardView(cloneTemplate(this.basketRowTemplate), this.events);
            const itemElement = basketCard.render(product, index + 1);
            basketCardArray.push(itemElement);
        });
    }
    return basketCardArray;
  }
}