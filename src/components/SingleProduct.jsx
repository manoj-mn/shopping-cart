import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import { CartContext } from '../context/Context'
import { useContext } from 'react'

export default function SingleProduct({ prod }) {
  const { state, dispatch } = useContext(CartContext)
  const { cart } = state

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={prod.image} />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Text className='d-flex flex-column'>
          <span>$ {prod.price}</span>
          <span>
            {prod.fastDelivery ? 'Next day delivery' : '4 days delivery'}
          </span>
          <Rating rating={prod.rating} />
        </Card.Text>

        {cart.some((p) => p.id === prod.id) ? (
          <Button
            variant='danger'
            onClick={() =>
              dispatch({ type: 'REMOVE_FROM_CART', payload: { id: prod.id } })
            }
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            disabled={!prod.inStock}
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: prod })}
          >
            {prod.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
