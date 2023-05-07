import { type Product } from '../../types'
import useCart from '../Hook/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './icons'
import './Product.css'
interface Props {
  products: Product[]
}

export function Products ({ products }: Props) {
  const { addToCart, removeFromCart, cart } = useCart()
  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
        <main className='products'>
            <ul>
                {products.slice(0, 10).map((product: Product) => {
                  const isproductInCart = checkProductInCart(product)
                  return (
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={product.title}/>
                            <div>
                                <strong>{product.title}</strong>- {product.price}
                            </div>
                            <div>
                                <button
                                style={{ backgroundColor: isproductInCart ? 'red' : '#09f' }}
                                onClick={() => {
                                  isproductInCart
                                    ? removeFromCart({ product })
                                    : addToCart({ product })
                                }}>
                                    {isproductInCart
                                      ? <RemoveFromCartIcon/>
                                      : <AddToCartIcon/>
                                    }
                                </button>
                            </div>
                        </li>
                  )
                })
                }
            </ul>
        </main>
  )
}
