import { FilterBy, type ProviderFilter, type Product } from '../../types.d'
import { useContext } from 'react'
import { FilterContext } from '../Context/FilterContext'
import allProduct from '../mocks/product.json'

export default function useFilters () {
  const products = allProduct.products
  const { filters, setFilters } = useContext<ProviderFilter>(FilterContext)

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (
          filters.category === FilterBy.ALL ||
          product.category === filters.category
        )
      )
    })
  }
  const productFilter = filterProducts(products)

  return { productFilter, setFilters, filters }
}
