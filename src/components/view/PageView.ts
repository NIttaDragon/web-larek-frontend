import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import { Component } from "../base/Component";

export class PageView extends Component<PageView> {
    private basketCounter: HTMLElement;
    private basketButton: HTMLElement;
    private gallery: HTMLElement;
    private eventEmitter: EventEmitter;
    protected _wrapper: HTMLElement;

    constructor(container: HTMLElement, eventEmitter: EventEmitter) {
        super(container);

        this.eventEmitter = eventEmitter;
        this.basketCounter = ensureElement<HTMLElement>(SETTINGS.basketCounter);
        this.basketButton = ensureElement<HTMLElement>(SETTINGS.basketHeader);
        this.gallery = ensureElement<HTMLElement>(SETTINGS.gallerySelector);
        this._wrapper = ensureElement<HTMLElement>(SETTINGS.pageWrapper);

        this.basketButton.addEventListener('click', () => {
            this.eventEmitter.emit('basket:open');
        });
    }

    setBasketCounter(value: number): void {
        this.setText(this.basketCounter, String(value));
    }

    updateGallery(cards: HTMLElement[]): void {
        this.gallery.replaceChildren(...cards);
    }

    setlocked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}