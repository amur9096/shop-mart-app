import { BrandI } from "./brand"
import { CategoryI } from "./category"
import { SubcategoryI } from "./subCategory"

export interface AllOrderProductI {
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  id: string
}
