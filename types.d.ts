export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}
export interface ProductCart extends Product {
  quantity: number
}

export interface AllProduct {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export enum FilterBy {
  ALL = 'all',
  LAPTOPS = 'laptops',
  SMARTPHONE = 'smartphones',
  HOME_DECORATION = 'home-decoration',
  FRAGRANCES = 'fragrances',
  SKINCARE = 'skincare',
  GROCERIES = 'groceries'
}
interface Filters {
  category: FilterBy[keyof FilterBy]
  minPrice: number
}
export interface ProviderFilter {
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
}
