// src/components/controller/modalController.ts
import { EventEmitter } from '../base/events';
import { Modal } from '../common/modal';

export class ModalController {
    private modal: Modal;
    private events: EventEmitter;

    constructor(modal: Modal, events: EventEmitter) {
        this.modal = modal;
        this.events = events;
    }

    openModal(content: HTMLElement) {
        this.modal.content = content;
        this.modal.open();
    }

    closeModal() {
        this.modal.close();
    }
}
