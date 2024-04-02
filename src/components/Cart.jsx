import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { CartContext } from '../context/Context'
import Rating from './Rating'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useContext } from 'react'

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext)

  return (
    <>
      <ListGroup className='ms-4 mt-3 w-75'>
        {cart.map((c) => (
          <ListGroup.Item key={c.id}>
            <Row>
              <Col md={2}>
                <Image
                  src={c.image}
                  alt={c.name}
                  rounded
                  style={{ width: 150 }}
                />
              </Col>
              <Col md={2}>{c.name}</Col>
              <Col>$ {c.price}</Col>
              <Col>
                <Rating rating={c.rating} />
              </Col>
              <Col md={1}>
                <Form.Select
                  disabled={!c.inStock}
                  aria-label='select quantity'
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_CART_QTY',
                      payload: { ...c, qty: e.target.value },
                    })
                  }
                >
                  {[...Array(c.inStock)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={1}>
                <RiDeleteBin7Fill
                  style={{ cursor: 'pointer' }}
                  className='ms-auto'
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_FROM_CART',
                      payload: { id: c.id },
                    })
                  }
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div
        className='filter-container ms-auto'
        style={{
          height: 'calc(100vh - 100px)',
        }}
      >
        <h3 className='mb-3 mt-4'>
          Subtotal (
          {cart.reduce((acc, c) => {
            acc += +c.qty
            return acc
          }, 0)}
          ) items
        </h3>
        <span>
          Total: $
          {cart.reduce((acc, c) => {
            acc += c.price * c.qty
            return acc
          }, 0)}
        </span>
        <Button className='w-100 mt-4'>Proceed to Checkout</Button>
      </div>
    </>
  )
}
