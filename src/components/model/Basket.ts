import { IBasket } from "../../types/models/Basket";
import { IProduct } from "../../types/models/Product";

export class Basket implements IBasket {
  items: IProduct[] = [];
  totalPrice: number = 0;

  addItem(product: IProduct): void {
      this.items.push(product);
      this.updateTotalPrice();
  }

  removeItem(productId: string): void {
      this.items = this.items.filter(item => item.id !== productId);
      this.updateTotalPrice();
  }

  clear(): void {
      this.items = [];
      this.totalPrice = 0;
  }

  private updateTotalPrice(): void {
      this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
