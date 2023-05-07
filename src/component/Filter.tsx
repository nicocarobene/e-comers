import { useId } from 'react'
import { FilterBy, type Filters } from '../../types.d'
import useFilters from '../Hook/useFilters'
import './Filter.css'

export default function Filter () {
  const { filters, setFilters } = useFilters()
  const { minPrice } = filters
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilter: Filters) => ({
      ...prevFilter,
      minPrice: Number(e.target.value)
    }
    ))
  }
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilter: Filters) => ({
      ...prevFilter,
      category: e.target.value
    }))
  }

  return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>MinPrice</label>
                <input type="range"
                id={minPriceFilterId}
                min='0'
                max='1000'
                onChange={handleChangePrice}/>
                <span>{minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select id={categoryFilterId} onChange={handleSelect} >
                    <option value={FilterBy.ALL}>All</option>
                    <option value={FilterBy.LAPTOPS}>Laptops</option>
                    <option value={FilterBy.SMARTPHONE}>SmartPhone</option>
                    <option value={FilterBy.FRAGRANCES}>Fragances</option>
                    <option value={FilterBy.GROCERIES}>Groceries</option>
                    <option value={FilterBy.HOME_DECORATION}>Home Decoration</option>
                    <option value={FilterBy.SKINCARE}>Skincares</option>
                </select>
            </div>
        </section>
  )
}
