export interface IProductController {
  loadProducts(): Promise<void>;
  showProductModal(productId: string): void;
}
