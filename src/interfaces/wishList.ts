import { ProductI } from "./product";

export interface WishListResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: DataWishList;
}
export interface DataWishList {
  _id: string;
  cartOwner: string;
  products: ItemWishList[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface ItemWishList {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

