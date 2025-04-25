import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";
import { IModal } from "../../types/views/Modal";

export class Modal implements IModal {
    protected modal: HTMLElement;
    protected content: HTMLElement;

    constructor() {
        this.modal = ensureElement<HTMLElement>(SETTINGS.modal.container);
        this.content = ensureElement<HTMLElement>(SETTINGS.modal.content, this.modal);
        
        const closeButton = ensureElement<HTMLElement>(SETTINGS.modal.closeButton, this.modal);
        closeButton.addEventListener('click', this.close.bind(this));
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(content?: HTMLElement): void {
        if (content) {
            this.setContent(content);
        }
        this.modal.classList.add(SETTINGS.modal.modalActiveClass);
    }

    close(): void {
        this.modal.classList.remove(SETTINGS.modal.modalActiveClass);
    }

    setContent(content: HTMLElement): void {
        this.content.replaceChildren(content);
    }

    clearContent(): void {
        this.content.innerHTML = '';
    }
}