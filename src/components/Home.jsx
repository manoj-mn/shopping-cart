import { CartContext } from '../context/Context'
import SingleProduct from './SingleProduct'
import Filter from './Filter'
import { useContext } from 'react'

export default function Home() {
  const { state, filterState } = useContext(CartContext)
  const { products } = state
  const { byOOStock, byFastDelivery, byRating, bySearch, sort } = filterState
  const transform = (products) => {
    let tProducts = [...products]
    if (sort === 'ascending') {
      tProducts.sort((a, b) => a.price - b.price)
    } else if (sort === 'descending') {
      tProducts.sort((a, b) => b.price - a.price)
    }
    if (!byOOStock) {
      tProducts = tProducts.filter((p) => p.inStock)
    }
    if (byFastDelivery) {
      tProducts = tProducts.filter((p) => p.fastDelivery)
    }
    if (byRating) {
      tProducts = tProducts.filter((p) => p.rating >= byRating)
    }
    if (bySearch) {
      tProducts = tProducts.filter((p) =>
        p.name.toLowerCase().includes(bySearch.toLowerCase())
      )
    }
    return tProducts
  }
  return (
    <>
      <Filter />
      <div className='products'>
        {transform(products).map((p) => (
          <SingleProduct prod={p} key={p.id} />
        ))}
      </div>
    </>
  )
}
