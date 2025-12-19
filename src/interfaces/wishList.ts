import { ProductI } from "./product";

export interface WishListResponse {
  status: string;
  message?: string;
  count: number;
  data: ProductI[];
}
