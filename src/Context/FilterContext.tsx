import { createContext, useState } from 'react'
import { FilterBy, type Filters, type ProviderFilter } from '../../types.d'

export const FilterContext = createContext<ProviderFilter>({
  filters: {
    category: FilterBy.ALL,
    minPrice: 0
  },
  setFilters: undefined
})

export default function FilterProvider ({ children }: { children: React.ReactElement }) {
  const [filters, setFilters] = useState<Filters>({
    category: FilterBy.ALL,
    minPrice: 0
  })
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
        {children}
    </FilterContext.Provider>
  )
}
