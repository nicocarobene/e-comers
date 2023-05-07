import { useRef, useState, useEffect } from 'react'
import { type Product } from '../../types'
import useCart from '../Hook/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './icons'
import './Product.css'
import { useIntersectionObserver } from 'usehooks-ts'
interface Props {
  products: Product[]
}

export function Products ({ products }: Props) {
  const [item, setItem] = useState(9)
  const [Cart, setShowCart] = useState({
    showMore: true,
    showLess: false
  })
  const lazyLoad = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(lazyLoad, {})
  const isVisible = !!((entry?.isIntersecting) ?? false)

  const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.target as HTMLElement
    if (value.innerHTML === 'ShowMore') {
      setShowCart({ showMore: false, showLess: true })
      setItem(item + 3); return
    }
    setShowCart({ showMore: true, showLess: true })
    setItem(9)
  }

  useEffect(() => {
    if (Cart.showMore) return
    isVisible && setItem(item + 3)
  }, [isVisible])

  const { addToCart, removeFromCart, cart } = useCart()
  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
        <main className='products' style={{ display: 'flex', flexDirection: 'column' }}>
            <ul>
                {products.slice(0, item).map((product: Product) => {
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
            {
            Cart.showMore
              ? <button onClick={handleShowMore} style={{ color: '#fff' }}>ShowMore</button>
              : <button onClick={handleShowMore} style={{ color: '#fff' }}>ShowLess</button>
            }
            <div id='lazy' ref={lazyLoad}></div>
        </main>
  )
}
