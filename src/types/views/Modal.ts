export interface IModal {
  open(content?: HTMLElement): void;
  close(): void;
  setContent(content: HTMLElement): void;
  clearContent(): void;
}
