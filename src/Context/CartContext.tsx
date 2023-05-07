import { createContext, useReducer } from 'react'
import { type Product, type ProductCart } from '../../types'

export interface CartProviderItem {
  cart: ProductCart[]
  addToCart: ({ product }: { product: Product }) => void
  removeFromCart: ({ product }: { product: Product }) => void
  clearCart: () => void
  removeItem: ({ product }: { product: Product }) => void
}
const defaultValue: ProductCart[] = []

const InitialState: ProductCart[] = (() => {
  const PersistedState = localStorage.getItem('e-commers')
  return (PersistedState != null) ? JSON.parse(PersistedState) : defaultValue
})()

const updateState = (state: ProductCart[]) => {
  localStorage.setItem('e-commers', JSON.stringify(state))
}

enum Type {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  REMOVE_ITEM = 'REMOVE_ITEM',
  CLEAR_CART = 'CLEAR_CART'
}

interface Action {
  type: Type [keyof Type]
  payload: Product
}

const reducer = (state: ProductCart[], action: Action) => {
  const { type, payload } = action
  switch (type) {
    case Type.ADD_TO_CART:{
      const producAlreadyExist = state.findIndex((item) => item.id === payload.id)
      if (producAlreadyExist >= 0) {
        const newCart: ProductCart[] = structuredClone(state)
        newCart[producAlreadyExist].quantity += 1
        updateState(newCart)
        return newCart
      }
      const newCart = [...state, { ...payload, quantity: 1 }]
      updateState(newCart)
      return newCart
    }

    case Type.REMOVE_FROM_CART:{
      const newCart = state.filter(item => item.id !== payload.id)
      updateState(newCart)
      return newCart
    }

    case Type.REMOVE_ITEM: {
      const productAlreadyExist = state.findIndex(item => item.id === payload.id)
      if (productAlreadyExist >= 0) {
        let newCart: ProductCart[] = structuredClone(state)
        console.log(newCart[productAlreadyExist].quantity)
        newCart[productAlreadyExist].quantity === 0
          ? newCart[productAlreadyExist].quantity = 0
          : newCart[productAlreadyExist].quantity -= 1
        if (newCart[productAlreadyExist].quantity === 0) {
          newCart = newCart.filter(item => item.id !== payload.id)
        }
        updateState(newCart)
        return newCart
      }
      return state
    }

    case Type.CLEAR_CART:{
      window.localStorage.removeItem('e-commers')
      return InitialState
    }
  }
  return []
}

const useCartReducer = () => {
  const [state, dispatch] = useReducer(reducer, InitialState)

  const addToCart = ({ product }: { product: Product }) => {
    dispatch({
      type: Type.ADD_TO_CART,
      payload: product
    })
  }
  const removeFromCart = ({ product }: { product: Product }) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      payload: product
    })
  }
  const clearCart = () => {
    dispatch({ type: Type.CLEAR_CART, payload: InitialState[0] })
  }
  const removeItem = ({ product }: { product: Product }) => {
    dispatch({
      type: Type.REMOVE_ITEM,
      payload: product
    })
  }

  return { addToCart, removeFromCart, clearCart, removeItem, cart: state }
}

export const CartContext = createContext<CartProviderItem | null>(null)

export default function CartProvider ({ children }: { children: React.ReactElement[] }) {
  const { cart, addToCart, clearCart, removeFromCart, removeItem } = useCartReducer()

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
