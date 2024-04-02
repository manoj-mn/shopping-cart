import { createContext, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { CartReducer, FilterReducer } from './Reducers'
import '../App.scss'

export const CartContext = createContext()
// faker.seed(99)
export default function Context({ children }) {
  const products = [...Array(30)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr(),
    inStock: faker.helpers.arrayElement([0, 1, 3, 5, 7]),
    fastDelivery: faker.datatype.boolean(),
    rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }))
  const [state, dispatch] = useReducer(CartReducer, {
    products,
    cart: [],
  })

  const [filterState, filterDispatch] = useReducer(FilterReducer, {
    byOOStock: false,
    byFastDelivery: false,
    byRating: 0,
    bySearch: '',
  })

  return (
    <CartContext.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </CartContext.Provider>
  )
}
