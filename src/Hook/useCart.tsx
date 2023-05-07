import { useContext } from 'react'
import { CartContext, type CartProviderItem } from '../Context/CartContext'

export default function useCart () {
  const context = useContext(CartContext)
  if (context === undefined) throw new Error('UseCart must be used with Provider')
  const { cart, addToCart, clearCart, removeFromCart, removeItem } = context as CartProviderItem

  return { cart, addToCart, clearCart, removeFromCart, removeItem }
}
