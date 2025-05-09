import { FormErrors } from "../types";
import { IAppState } from "../types/AppState";
import { IOrder } from "../types/models/Order";
import { IProduct } from "../types/models/Product";
import {Model} from "./base/model";

export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IProduct[];
    loading: boolean;
    order: IOrder = {
        email: '',
        phone: '',
        payment: '',
        address: '',
        items: [],
        total: 0
    };
    preview: string | null;
    formErrors: FormErrors = {};
}