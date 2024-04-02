import { FaRegStar, FaStar } from 'react-icons/fa'
import { CartContext } from '../context/Context'
import { useContext } from 'react'

export default function Rating(props) {
  const { filterState, filterDispatch } = useContext(CartContext)
  const rating = props.rating || filterState.byRating
  const editable = props.rating === undefined
  return (
    <span>
      {[...Array(5)].map((_, i) => (
        <span
          style={{ cursor: editable && 'pointer' }}
          onClick={() =>
            editable && filterDispatch({ type: 'BY_RATING', payload: i + 1 })
          }
          key={i}
        >
          {i >= rating ? <FaRegStar /> : <FaStar />}
        </span>
      ))}
    </span>
  )
}
