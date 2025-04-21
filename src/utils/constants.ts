export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS = {
  gallerySelector: '.gallery',
  cardTemplate: '#card-catalog',
  cardSettings: {
    title: '.card__title',
    category: '.card__category',
    image: '.card__image',
    price: '.card__price'
  },
  productTemplate: '#card-preview',
  productSettings: {
    title: '.card__title',
    category: '.card__category',
    image: '.card__image',
    price: '.card__price',
    description: '.card__text',
    compactClass: '.card_full'
  },
  basketRowTemplate: '#card-basket',
  basketRowSettings: {
    rowNumber: '.basket__item-index',
    productTitle: '.card__title',
    productPrice: '.card__price'
  },
  basketTemplate: '#basket',
  basketSettings: {
    basketRow: '.basket__list',
    totalPrice: '.basket__price'
  },
  paymentElement: ['form', {className: 'order'}],
  paymentSettings: {
    paymentType: ['button', {className: 'payment_type'}],
    address: 'input[name=address]'
  },
  contactsTemplate: '#contacts',
  contactsSettings: {
    mail: 'input[name=email]',
    phone: 'input[name=phone]'
  },
  modalTemplate: '#modal',
  modalSettings: {
    close: '.modal__close',
    content: '.modal__content',
    activeClass: '.modal_active'
  },
  productModal: {
    image: '.card__image',
    productCategory: '.card__category',
    productTitle: '.card__title',
    description: '.card__text',
    productPrice: 'card__price',
    nextLabel: 'В корзину',
    nextSettings: ['button', {className: 'button'}]
  },
  basketModal: {
    headerTitle: 'Корзина',
		nextLabel: 'Оформить',
		nextSettings: ['button', { className: 'button' }],
  },
  messageTemplate: '#success',
  messageSettings: {
    title: '.order-success__title',
    description: '.order-success__description'
  },
  messageModal: {
    title: 'Заказ оформлен',
    description: 'Списано 0 синапсов',
    action: 'За новыми покупками!'
  }
};
