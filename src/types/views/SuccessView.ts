export interface ISuccessView {
  render(totalPrice: number): HTMLElement;
  getCloseButton(): HTMLButtonElement
}
