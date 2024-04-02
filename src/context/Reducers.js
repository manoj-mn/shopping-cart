export function CartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload.id),
      }
    case 'UPDATE_CART_QTY':
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p.id === action.payload.id) p.qty = action.payload.qty
          return p
        }),
      }
    default:
      return state
  }
}

export function FilterReducer(state, action) {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, sort: action.payload }
    case 'INCLUDE_OO_STOCK':
      return { ...state, byOOStock: action.payload }
    case 'FAST_DELIVERY_ONLY':
      return { ...state, byFastDelivery: action.payload }
    case 'BY_RATING':
      return { ...state, byRating: action.payload }
    case 'BY_SEARCH':
      return { ...state, bySearch: action.payload }
    case 'CLEAR':
      return {
        byOOStock: false,
        byFastDelivery: false,
        byRating: 0,
        bySearch: '',
      }
    default:
      return state
  }
}
