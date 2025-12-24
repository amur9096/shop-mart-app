import { CartItemI } from "./cartItem";

import { UserI } from "./user";
import { ProductI } from "@/interfaces";

export interface AllOrdersI {
  shippingAddress?: ShippingAddressI;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: UserI;
  cartItems: CartItemI[];
  createdAt: string;
  updatedAt: string;
  id: number;
  products: ProductI[];
}

export interface ShippingAddressI {
  details: string;
  phone: string;
  city: string;
}
