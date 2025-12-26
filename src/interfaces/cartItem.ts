import { ProductI } from "./product";

export interface CartItemI {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}
