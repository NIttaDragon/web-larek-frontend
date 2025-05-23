import { EventEmitter } from "../base/events";
import { IProduct } from "../../types/models/Product";
import { ProductCardView } from "../view/ProductCardView";
import { ProductModalView } from "../view/ProductModalView";
import { ProductAPI } from "../productApi";
import { PageView } from "../view/PageView";
import { ModalController } from "./modalController";

export class ProductController {
    private api: ProductAPI;
    private events: EventEmitter;
    private pageView: PageView;
    private modalController: ModalController;

    constructor(api: ProductAPI, events: EventEmitter, pageView: PageView, modal: ModalController) {
        this.api = api;
        this.events = events;
        this.pageView = pageView;
        this.modalController = modal;
        this.events.on('product:open', this.handleProductOpen.bind(this));
    }

    async loadProducts() {
        try {
            const products = await this.api.getProductList();
            this.displayProducts(products);
        } catch (error) {
            console.error("Ошибка при загрузке товаров:", error);
        }
    }

    displayProducts(products: IProduct[]) {
        const cards = products.map(product => {
            const cardView = new ProductCardView();
            const card = cardView.render(product);
            card.addEventListener('click', () => {
              this.events.emit('product:open', product);
          });
            return card;
        });
        this.pageView.updateGallery(cards);
    }

    handleProductOpen(product: IProduct) {
        const productModalView = new ProductModalView(this.events);
        this.modalController.openModal(productModalView.render(product));
    }
}
