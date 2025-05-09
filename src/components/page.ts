import {Component} from "./base/Component";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";
import { SETTINGS } from "../utils/constants";

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>(SETTINGS.basketCounter);
        this._catalog = ensureElement<HTMLElement>(SETTINGS.gallerySelector);
        this._wrapper = ensureElement<HTMLElement>(SETTINGS.pageWrapper);
        this._basket = ensureElement<HTMLElement>(SETTINGS.basketHeader);

        this._basket.addEventListener('click', () => {
            this.events.emit('bids:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}