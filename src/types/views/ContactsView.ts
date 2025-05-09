export interface IContactsView {
  render(): HTMLElement;
}

export interface IContactForm {
  email: string;
  phone: string;
}