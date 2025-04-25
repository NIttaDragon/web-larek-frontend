import { IProductController } from "../../types/controllers/ProductController";
import { Api } from "../base/api";
import { EventEmitter } from "../base/events";
import { SETTINGS } from "../../utils/constants";
import { IProduct } from "../../types/models/Product";
import { Product } from "../model/Product";
import { Modal } from "../view/Modal";
import { IProductCardView } from "../../types/views/ProductCardView";
import { IProductModalView } from "../../types/views/ProductModalView";
import { ProductCardView } from "../view/ProductCardView";
import { ProductModalView } from "../view/ProductModalView";

export class ProductController implements IProductController {
  private api: Api;
    private eventEmitter: EventEmitter;
    private productCardView: IProductCardView;
    private productModalView: IProductModalView;
    private modal: Modal;

    constructor(api: Api, eventEmitter: EventEmitter) {
        this.api = api;
        this.eventEmitter = eventEmitter;
        this.productCardView = new ProductCardView();
        this.productModalView = new ProductModalView(eventEmitter);
        this.modal = new Modal();
    }

  async loadProducts(): Promise<void> {
      try {
          const data: any = await this.api.get('/products'); // Замените на реальный URI
          const products: IProduct[] = data.items.map((item: IProduct) => new Product(item));

          const gallery = document.querySelector(SETTINGS.gallerySelector);

          if (gallery) {
              products.forEach(product => {
                  const card = this.productCardView.render(product);
                  gallery.appendChild(card);
                  card.addEventListener('click', () => this.showProductModal(product.id));
              });
          } else {
              console.error('Gallery element not found.');
          }

      } catch (error) {
          console.error('Error loading products:', error);
      }
  }

  showProductModal(productId: string): void {
    this.api.get(`/products/${productId}`)
        .then((productData: any) => {
            const product = new Product(productData);
            const modalContent = this.productModalView.render(product);
            this.modal.open(modalContent);
        })
        .catch(error => console.error('Error fetching product details:', error));
}
}
