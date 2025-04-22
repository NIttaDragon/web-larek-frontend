import { ensureElement } from "../../utils/utils";
import { SETTINGS } from "../../utils/constants";

export interface ISuccessView {
  render(totalPrice: number): void;
  openModal(): void;
  closeModal(): void;
}

export class SuccessView implements ISuccessView {
  private modal: HTMLElement;
  private content: HTMLElement;

  constructor() {
      this.modal = ensureElement<HTMLElement>(SETTINGS.modal.container);
      this.content = ensureElement<HTMLElement>(SETTINGS.modal.content, this.modal);
  }

  render(totalPrice: number): void {
      this.content.innerHTML = '';
      const template = document.querySelector<HTMLTemplateElement>(SETTINGS.successTemplate);
      if (!template) {
          throw new Error('Шаблон не найден');
      }
      const success = template.content.cloneNode(true) as HTMLElement;
      this.content.appendChild(success);

      const price = ensureElement<HTMLElement>(SETTINGS.success.description, this.content);
      price.textContent = `Списано ${totalPrice} синапсов`;

      const closeButton = ensureElement<HTMLButtonElement>(SETTINGS.success.closeButton, this.content);
      closeButton.addEventListener('click', () => {
          this.closeModal();
      });
  }

  openModal(): void {
      this.modal.classList.add(SETTINGS.modal.modalActiveClass);
  }

  closeModal(): void {
      this.modal.classList.remove(SETTINGS.modal.modalActiveClass);
  }
}
