import {SelectorElement, isSelector, ensureElement, createElement, isPlainObject, ElementChild, ElementProps, setElementChildren, setElementProps, ElementValue, isChildElement} from './utils/utils'

export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
}

//данные товара
export interface IProduct {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  price: number;
  description: string;
}

export interface Contacts {
  address: string;
  mail: string;
  phone: string;
}

export interface Order extends Contacts{
  payType: string;
  products: string[];
  totalPrice: number;
}

export interface OrderResult {
  error?: string;
  id?: string;
  total?: number;
}

export interface BasketRow {
  productId: string;
  rowNumber: number;
  productTitle: string;
  price: number;
}

export interface Basket {
  productRow: BasketRow;
  totalPrice: number;
  //deleteProduct(id: string): void;
}

export enum AppStateModals {
  //modalClass: string;
  description,
  basket,
  payment,
  contacts,
  success
}

export interface IProductApi {
  getProducts: () => Promise<IProduct[]>;
  orderProducts: (order: Order) => Promise<OrderResult[]>;
}

export interface AppState {
  products?: IProduct[];
  openedModal: AppStateModals | null;
  basketProduct?: IProduct;
  orderedProducts: IProduct[];
  basket: Basket[];
  basketTotal: number;
  contacts: Contacts;
  isOrderReady: boolean;
  validationError: string | null;

  loadProducts(): Promise<void>;
  openModal(modal: AppStateModals): void;
  ///selectProduct(id: string): void;
  fillContacts(contacts: Partial<Contacts>): void;
  orderProducts(): Promise<OrderResult[]>;
}

export enum AppStateChanges {
  products,
  modal,
  selectProduct,
  basket,
  order
}

export interface AppStateSettings {
  currency: string;
  storageKey: string;
  onChange: (changed: AppStateChanges) => void;
}

export interface ProductData {
  title: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export interface ProductSettings {
  title: string;
  category: string;
  image: string;
  price: string;
  description: string;
  compactClass: string;
  isCompact: boolean;
  // tagsSeparator: string;
}

export interface BasketRowData {
  rowNumber: number;
  productTitle: string;
  productPrice: number;
}

export interface BasketRowSettings {
  rowNumber: string;
  productTitle: string;
  productPrice: string;
}

export interface BasketData {
  basketRow: BasketRowData[];
  totalPrice: number;
}

export interface BasketSettings {
  basketRow: string;
  totalPrice: string;
}

export interface PaymentData {
  paymentType: string;
  address: string;
}

export interface PaymentSettings {
  paymentType: string;
  address: string;
}

export interface ContactsData {
  mail: string;
  phone: string;
}

export interface ContactsSettings {
  mail: string;
  phone: string;
}

export interface SuccessData {
  totalPrice: number;
}

export interface SuccessSettings {
  totalPrice: string;
}


// Базовое отображение
export abstract class BaseView<T, S extends object> {
  // чтобы при копировании создавать дочерний класс, не зная его имени
	['constructor']!: new (root: HTMLElement, settings: S) => this;
	// введем кеш чтобы не пересоздавать и не искать повторно элементы
	protected cache: Record<string, HTMLElement> = {};

	// конструктор с элементом и настройками,
	// в простейшем виде без проверок и дефолтных значений
	constructor(public element: HTMLElement, protected readonly settings: S) {
		// чтобы не переопределять конструктор, для компактности и соблюдения интерфейса
		// можно реализовать так называемые методы жизненного цикла класса,
		// которые вызываются в нужный момент и могут быть легко переопределены.
		this.init();
		if (!this.element) {
			throw new Error('Element is not defined');
		}
	}

	// копирующий конструктор, чтобы настроить один раз
	// и дальше использовать копии отображения везде,
	// но при желании можем что-то поменять, например обработчики событий
	copy(settings?: S) {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}

	// методы жизненного цикла
	// начальная инициализация, здесь можно создать элементы, повесить слушатели и т.д.
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init() {}

	// рендер, вызывается когда надо обновить отображение с данными
	render(data: Partial<T>): HTMLElement {
		// Простая реализация рендера позволяющая, в том числе
		// установить сеттеры для отдельных полей
		// и вызывать их через поверхностное копирование.
		if (typeof data === 'object') {
			// это не безопасная конструкция в JS,
			// но при правильной типизации в TS можем себе позволить
			// главное это прописать тип данных для рендера в дочерних классах
			Object.assign(this, data);
		}
		return this.element;
	}

	// ... другие методы которые помогут строить отображение

	// Обернем метод проверки элемента из утилит в кеш, чтобы повторно не искать по DOM
	protected ensure<T extends HTMLElement>(
		query?: SelectorElement<T>,
		root: HTMLElement = this.element
	): T {
		if (!isSelector(query)) {
			return ensureElement(query);
		} else {
			if (!this.cache[query]) {
				this.cache[query] = ensureElement(query, root);
			}
			return this.cache[query] as T;
		}
	}

	// замена элемента на другой или его обновлённую версию
	// с проверкой существования обоих
	protected setElement<T extends HTMLElement>(
		query: SelectorElement<T>,
		value: HTMLElement
	) {
		const el = this.ensure(query);
		el.replaceWith(value);
	}

	protected ensureTemplate(query: string) {
		const el = this.ensure(query);
		el.remove();
		return el.cloneNode(true) as HTMLElement;
	}

	protected create<T extends HTMLElement>(
		settings:
			| [keyof HTMLElementTagNameMap, ElementProps<T>]
			| keyof HTMLElementTagNameMap,
		props?: ElementProps<T>,
		children?: ElementChild
	): T {
		if (typeof settings === 'string')
			return createElement<T>(settings, props, children);
		else if (Array.isArray(settings)) {
			return createElement<T>(
				settings[0],
				{
					...settings[1],
					...(props ?? {}),
				},
				children
			);
		} else throw new Error('Unknown create settings');
	}

	setVisibility<T extends HTMLElement>(
		query: SelectorElement<T>,
		isVisible: boolean
	) {
		const el = this.ensure(query);
		if (isVisible) el.style.removeProperty('display');
		else el.style.setProperty('display', 'none');
	}

	// метод для универсальной установки свойств тега
	protected setValue<T extends HTMLElement>(
		query: SelectorElement<T>,
		value: ElementValue<T>
	) {
		const el = query instanceof HTMLElement ? query : this.ensure(query);
		if (typeof value === 'string') el.textContent = value;
		else if (isChildElement(value)) setElementChildren(el, value);
		else if (isPlainObject(value)) {
			setElementProps<T>(el, value as ElementProps<T>);
		} else {
			throw new Error('Unknown value type');
		}
	}
} 

export class ProductView extends BaseView<ProductData, ProductSettings> {
  init() {
    this.isCompact = this.settings.isCompact;
  }

  set image(value: string) {
    this.setValue<HTMLImageElement>(this.settings.image, {src: value});
  }

  set title(value: string) {
    this.setValue(this.settings.title, value);
    this.setValue<HTMLImageElement>(this.settings.image, {alt: value});
  }

  set category(value: string/*[]*/) {
    this.setValue(this.settings.category, value/*.join(this.settings.tagsSeparator)*/);
  }

  set description(value: string) {
    this.setValue(this.settings.description, value);
  }

  set price(value: number) {
    this.setValue(this.settings.price, String(value));
  }

  set isCompact(value: boolean) {
    this.element.classList.toggle(this.settings.compactClass, value);
  }
}

export class PaymentView extends BaseView<PaymentData, PaymentSettings> {
  set paymentType(value: string) {
    this.setValue(this.settings.paymentType, value);
  }

  set address(value: string) {
    this.setValue(this.settings.address, value);
  }
}

export class ContactsView extends BaseView<ContactsData, ContactsSettings> {
  set mail(value: string) {
    this.setValue(this.settings.mail, value);
  }

  set phone(value: string) {
    this.setValue(this.settings.phone, value);
  }
}

export class SuccessView extends BaseView<SuccessData, SuccessSettings> {
  set totalPrice(value: number) {
    this.setValue(this.settings.totalPrice, String(value));
  }
}

export class BasketRowview extends BaseView<BasketRowData, BasketRowSettings> {
  set productTitle(value: string) {
    this.setValue(this.settings.productTitle, value);
  }

  set productPrice(value: number) {
    this.setValue(this.settings.productPrice, String(value));
  }
}
