import { Api } from "../../components/base/api";
import { EventEmitter } from "../../components/base/events";
import { IProduct, Product } from "../models/Product";
import { ProductCardView, IProductCardView } from "../views/ProductCardView";
import { ProductModalView, IProductModalView } from "../views/ProductModalView";
import { SETTINGS } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";

export interface IProductController {
  loadProducts(): Promise<void>;
  showProductModal(productId: string): void;
}

export class ProductController implements IProductController {
  private api: Api;
  private eventEmitter: EventEmitter;
  private productCardView: IProductCardView;
  private productModalView: IProductModalView;

  constructor(api: Api, eventEmitter: EventEmitter) {
      this.api = api;
      this.eventEmitter = eventEmitter;
      this.productCardView = new ProductCardView();
      this.productModalView = new ProductModalView(eventEmitter);
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
              this.productModalView.render(product);
              this.productModalView.openModal();
          })
          .catch(error => console.error('Error fetching product details:', error));
  }
}
