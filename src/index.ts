import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { cloneTemplate, ensureElement, isIProduct } from './utils/utils';
import { ProductAPI } from './components/productApi';
import { Modal } from './components/common/modal';
import { Basket } from './components/model/Basket';
import { BasketView } from './components/view/BasketView';
import { OrderView } from './components/view/OrderView';
import { ContactsView } from './components/view/ContactsView';
import { Page } from './components/page';
import { ProductCardView } from './components/view/ProductCardView';
import { AppState } from './components/appData';
import { IProduct } from './types/models/Product';
import { ProductModalView } from './components/view/ProductModalView';
import { SuccessView } from './components/view/SuccessView';
import { Order } from './components/model/Order';
import { Product } from './components/model/Product';
import { Api } from './components/base/api';
import { ModalController } from './components/controllers/modalController';
import { ProductController } from './components/controllers/ProductController';
import { BasketController } from './components/controllers/BasketController';
import { OrderController } from './components/controllers/OrderController';
import { PageView } from './components/view/PageView';
import { BasketCardView } from './components/view/BasketCardView';

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

const pageElement = ensureElement<HTMLElement>(SETTINGS.page);
const page = new Page(pageElement, events);
const pageView = new PageView(events);

const modalTemplate = ensureElement<HTMLTemplateElement>(SETTINGS.modalContainer);
const modal = new Modal(modalTemplate, events);
const modalController = new ModalController(modal, events);

const basket = new Basket();
const basketView = new BasketView(cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.basketTemplate)), events);
const order = new Order();
const orderView = new OrderView(cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.orderTemplate)), events);
const contactsView = new ContactsView(cloneTemplate(ensureElement<HTMLTemplateElement>(SETTINGS.contactsTemplate)), events);

const productController = new ProductController(api, events, pageView, modalController);
const basketController = new BasketController(basket, basketView, events, modalController);
const orderController = new OrderController(order, orderView, contactsView, events, api, modalController, basket);


let productModalView: ProductModalView;
let currentProduct: IProduct;

productController.loadProducts();

events.on('basket:count', (data: {count: number}) => {
  pageView.setBasketCounter(data.count);
});

events.on('product:open', (product: IProduct) => {
  currentProduct = product;
    productModalView = new ProductModalView(events);
    const isInBasket = basket.items.some(item => item.id === product.id);
    productModalView.setIsInBasket(isInBasket);
    modal.content = productModalView.render(product);
    
    productModalView.setEventListener();
    modal.open();
  });

events.on('order:open', () => {
  modal.open();
});

window.addEventListener('load', () => {
  productController.loadProducts();
  basketController.updateBasketCounter();
});

events.on('basket:changed', () => {
  
  basketView.render(basket, basketController.createBasketRows());
})
