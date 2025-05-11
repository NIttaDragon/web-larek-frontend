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
        this.events.emit('modal:open');
        this.modal.content = content;
        this.modal.open();
    }

    closeModal() {
        this.events.emit('modal:close');
        this.modal.close();
    }
}
