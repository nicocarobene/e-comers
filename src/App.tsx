import CartProvider from './Context/CartContext'
import useFilters from './Hook/useFilters'
import Footer from './component/Footer'
import Header from './component/Header'
import { Products } from './component/Products'
import Cart from './component/ShoppingCart'

function App () {
  const { productFilter } = useFilters()

  return (
    <CartProvider>
      <Header/>
      <Cart/>
      <Products products={productFilter} />
      <Footer/>
    </CartProvider>
  )
}

export default App
