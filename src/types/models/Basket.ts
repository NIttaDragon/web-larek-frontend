import { IProduct } from "./Product";

export interface IBasket {
    items: IProduct[];
    totalPrice: number;
    addItem(product: IProduct): void;
    removeItem(productId: string): void;
    clear(): void;
}
