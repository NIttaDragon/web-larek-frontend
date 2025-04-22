export interface IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export class Product implements IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;

  constructor(data: IProduct) {
      this.id = data.id;
      this.name = data.name;
      this.category = data.category;
      this.price = data.price;
      this.image = data.image;
      this.description = data.description;
  }
}
