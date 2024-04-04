import { Badge, Button, Dropdown, Form, Nav, Navbar } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/Context'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useContext } from 'react'

export default function Header() {
  const { state, dispatch, filterState, filterDispatch } =
    useContext(CartContext)
  const { cart } = state

  return (
    <Navbar
      bg='dark'
      variant='dark'
      className='ps-4'
      style={{ height: 80, paddingRight: '8rem' }}
    >
      <Navbar.Brand>
        <Link to='/'>Shopping Cart</Link>
      </Navbar.Brand>
      <Form.Control
        className='me-auto'
        style={{ width: 500, marginLeft: '6rem' }}
        placeholder='Search a product'
        value={filterState.bySearch}
        onChange={(e) =>
          filterDispatch({ type: 'BY_SEARCH', payload: e.target.value })
        }
      />
      <Nav>
        <Dropdown>
          <Dropdown.Toggle variant='success'>
            <FaShoppingCart fontSize='25px' />
            <Badge bg='none'>{cart.length}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu align='end' style={{ minWidth: 300 }}>
            <div className='d-flex flex-column'>
              {cart.length ? (
                cart.map((p) => (
                  <Dropdown.Item
                    as='div'
                    key={p.id}
                    className='hdr-cart-item d-flex'
                  >
                    <img src={p.image} alt={p.name} className='cart-img' />
                    <span
                      className='d-flex flex-column'
                      style={{ fontSize: 15 }}
                    >
                      <span>{p.name}</span>
                      <span>{p.price}</span>
                    </span>
                    <RiDeleteBin7Fill
                      className='ms-auto'
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: { id: p.id },
                        })
                      }
                    />
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item as='div'>Cart is empty</Dropdown.Item>
              )}
              {!!cart.length && (
                <Dropdown.Item as='div' className='mt-3 mx-2 p-0 w-auto'>
                  <Link to='/cart'>
                    <Button className='w-100'>Go To Cart</Button>
                  </Link>
                </Dropdown.Item>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}
