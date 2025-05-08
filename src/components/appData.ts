// import _ from "lodash";
// import {dayjs, formatNumber} from "../utils/utils";

import { FormErrors } from "../types";
import { IAppState } from "../types/AppState";
import { IOrder } from "../types/models/Order";
import { IProduct } from "../types/models/Product";
import {Model} from "./base/model";
// import {FormErrors, IAppState, IBasketItem, ILot, IOrder, IOrderForm, LotStatus} from "../types";

export type CatalogChangeEvent = {
    catalog: IProduct[]
};

// export class LotItem extends Model<ILot> {
//     about: string;
//     description: string;
//     id: string;
//     image: string;
//     title: string;
//     datetime: string;
//     history: number[];
//     minPrice: number;
//     price: number;
//     status: LotStatus;
// }

export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IProduct[];
    loading: boolean;
    order: IOrder = {
        email: '',
        phone: '',
        paymentMethod: '',
        deliveryAddress: ''
        // items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};

    // toggleOrderedLot(id: string, isIncluded: boolean) {
    //     if (isIncluded) {
    //         this.order.items = _.uniq([...this.order.items, id]);
    //     } else {
    //         this.order.items = _.without(this.order.items, id);
    //     }
    // }

    // clearBasket() {
    //     this.order.items.forEach(id => {
    //         this.toggleOrderedLot(id, false);
    //     });
    // }

    // getTotal() {
    //     return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    // }

    // setCatalog(items: ILot[]) {
    //     this.catalog = items.map(item => new LotItem(item, this.events));
    //     this.emitChanges('items:changed', { catalog: this.catalog });
    // }

    // setPreview(item: LotItem) {
    //     this.preview = item.id;
    //     this.emitChanges('preview:changed', item);
    // }

    // setOrderField(field: keyof IOrderForm, value: string) {
    //     this.order[field] = value;

    //     if (this.validateOrder()) {
    //         this.events.emit('order:ready', this.order);
    //     }
    // }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}