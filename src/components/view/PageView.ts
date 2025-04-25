import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class PageView {
    private basketCounter: HTMLElement;
    private basketButton: HTMLElement;
    private gallery: HTMLElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
        this.basketCounter = ensureElement<HTMLElement>(SETTINGS.basketCounter);
        this.basketButton = ensureElement<HTMLElement>(SETTINGS.basketHeader);
        this.gallery = ensureElement<HTMLElement>(SETTINGS.gallerySelector);
        
        this.basketButton.addEventListener('click', () => {
            this.eventEmitter.emit('basket:open');
        });
    }

    setBasketCounter(value: number): void {
        this.basketCounter.textContent = String(value);
    }

    updateGallery(cards: HTMLElement[]): void {
        this.gallery.replaceChildren(...cards);
    }
}