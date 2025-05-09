export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS = {
    page: '.page',
    pageWrapper: '.page__wrapper',
    gallerySelector: '.gallery',
    cardTemplate: '#card-catalog',
    productTemplate: '#card-preview',
    productSettings: {
        title: '.card__title',
        category: '.card__category',
        image: '.card__image',
        price: '.card__price',
        description: '.card__text',
        compactClass: '.card_full',
        buyButton: '.card__button'
    },
    basket: {
        list: '.basket__list',
        item: '.basket__item',
        itemIndex: '.basket__item-index',
        itemTitle: '.card__title',
        itemPrice: '.card__price',
        itemDeleteButton: '.basket__item-delete',
        totalPrice: '.basket__price',
        orderButton: '.basket__button'
    },
    basketCounter: '.header__basket-counter',
    basketHeader: '.header__basket',
    basketTemplate: '#basket',
    basketItemTemplate: '#card-basket',
    order: {
        paymentButtons: '.order__buttons',
        addressInput: 'input[name="address"]',
        submitButton: '.order__button',
        errors: '.form__errors',
        paymentButtonOnline: 'button[name="card"]',
        paymentButtonCash: 'button[name="cash"]',
        buttonActiveClass: 'button_alt-active'
    },
    orderTemplate: '#order',
    contacts: {
        emailInput: 'input[name="email"]',
        phoneInput: 'input[name="phone"]',
        submitButton: 'button[type="submit"]',
        errors: '.form__errors'
    },
    contactsTemplate: '#contacts',
    success: {
        title: '.order-success__title',
        description: '.order-success__description',
        closeButton: '.order-success__close'
    },
    successTemplate: '#success',
    modalContainer: '#modal-container',
    modal: {
        container: '.modal__container',
        content: '.modal__content',
        closeButton: '.modal__close',
        modalActiveClass: '.modal_active'
    }
};
