import { CartIcon, ClearCartIcon } from './icons'
import { useId } from 'react'
import './ShoppingCart.css'
import useCart from '../Hook/useCart'

const CartItem = ({ removeItem, addToCart, price, images, title, quantity }: { removeItem: () => void, addToCart: () => void, price: number, images: string, title: string, quantity: number }) => {
  const styles = { color: '#fff' }
  return (
    <li>
    <img src={images}
    alt={title}/>
    <div className='price'>
      <strong>{title}</strong>
      <span>Total: ${quantity * price}</span>
      <small> For unit: ${price}</small>
    </div>
    <footer>
        <small>
            Qty: {quantity}
        </small>
        <button onClick={addToCart} style={styles}>+</button>
        <button onClick={removeItem} style={styles} >-</button>
    </footer>
</li>
  )
}

export default function Cart () {
  const cartCheckBoxId = useId()
  const { cart, clearCart, addToCart, removeItem } = useCart()
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        <CartIcon/>
      </label>
      <input id={cartCheckBoxId} type='checkbox' hidden/>
      <aside className='cart'>
        <ul>
          {cart.map(item => (
            <CartItem key={item.id}
            addToCart = {() => { addToCart({ product: item }) }}
            removeItem= {() => { removeItem({ product: item }) }}
            price={item.price}
            images={item.thumbnail}
            quantity={item.quantity}
            title={item.title}
            />
          ))}
        </ul>
        <button
          style={{ backgroundColor: cart.length === 0 ? '' : 'red' }}
          onClick={() => { clearCart() }}>
            <ClearCartIcon/>
        </button>
      </aside>
    </>
  )
}
