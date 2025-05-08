import { IProduct } from "../../types/models/Product";

export class Product implements IProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;

  constructor(data: IProduct) {
      this.id = data.id;
      this.title = data.title;
      this.category = data.category;
      this.price = data.price;
      this.image = data.image;
      this.description = data.description;
  }
}
