// //интерфейс данных товара из апи
// export interface Item {
//   // id: string;
//   name: string;
//   tags: string [];
//   image: string;
//   cost: number;
//   description: string;
// }

// // export interface IItemAPI {
// //   getItems: () => Promise<Item[]>;
// //   orderItem: (order: Order) => Promise<OrderResult[]>;
// // }

// export interface AppState {
//   items: Item[]; //товары
//   selectedItemDescription?: string; //описание выбранного товара
//   openModel: AppStateModals | null; //открытое модальное окно
//   selectedItem?: Item; //выбранный товар
//   basketItems?: Item[]; //товары в корзине
//   // orderingItems: OrderingItems[]; //
//   basket: BasketItems[]; //корзина
//   basketTotal: number; //общая сумма корзины
//   contacts: Contacts; //контакты
//   isOrderReady: boolean; //валидность заказа
//   validationError: string | null; //ошибки при валидации

//   loadItems(): Promise<void>; //загрузка товаров на страницу
//   openModal(modal: AppStateModals): void; //открытие модалки
//   selectItem(id: string): void; //выбранный товар
//   fillContacts(contacts: Partial<Contacts>):void; //заполнение контактов
//   orderItems(): Promise<OrderResult[]>; //заказ товаров
// }

// //отображаемые товары в списке
// export interface ItemListData {
//   name: string;
//   tags: string [];
//   image: string;
//   cost: number;
// }

// // настройки для отображения товаров в списке
// export interface ItemListSettings{
//   name: string;
//   tags: string;
//   image: string;
//   cost: string;
//   compactClass: string; //
//   tagsSeparator: string; //разделитель тегов
//   isCompact: boolean; //проверка на Compact
// }

// //отображаемые товары в карточке
// export interface ItemCardData {
//   name: string;
//   tags: string [];
//   image: string;
//   cost: number;
//   description: string;
// }

// // настройки для отображения товаров в списке
// export interface ItemCardSettings{
//   name: string;
//   tags: string;
//   image: string;
//   cost: string;
//   description: string;
//   compactClass: string; //
//   tagsSeparator: string; //разделитель тегов
//   isCompact: boolean; //проверка на Compact
// }

// //отображаемые товары в списке
// export interface ItemBasketData {
//   name: string;
//   cost: number;
// }

// // настройки для отображения товаров в списке
// export interface ItemBasketSettings{
//   name: string;
//   cost: string;
//   compactClass: string; //
//   tagsSeparator: string; //разделитель тегов
//   isCompact: boolean; //проверка на Compact
// }

// export interface BasketItems{
//   row_number: number;
//   itemName: string;
//   itemCost: number;
// }

// export interface BasketItemsSettings {
//   row_number: string;
//   itemName: string;
//   itemCost: string;
//   compactClass: string; //
//   tagsSeparator: string; //разделитель тегов
//   isCompact: boolean; //проверка на Compact
// }

// /*
// interface IBasketModel {
//   items: Map<string, number>;
//   add(id: string): void;
//   remove(id: string): void;
// }

//  class BasketModel implements IBasketModel {
//   items: Map<string, number> = new Map();

//   add(id: string): void {
//     if (!this.items.has(id)) this.items.set(id, 0); //создаём новый
//     this.items.set(id, this.items.get(id)! + 1); //прибавляем количество
//   }

//   remove(id: string): void {
//     if(!this.items.has(id)) return; //если нет, то и делать с ним нечего
//     if(this.items.get(id)! > 0){ //если есть и больше нуля, то...
//       this.items.set(id, this.items.get(id)! - 1); //уменьшаем
//       if(this.items.get(id) === 0) this.items.delete(id); //если опустили до нуля, то удаляем
//     }
//   }
//  }
//   */