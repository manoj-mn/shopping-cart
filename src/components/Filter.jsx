import { Button, Form } from 'react-bootstrap'
import Rating from './Rating'
import { CartContext } from '../context/Context'
import { useContext } from 'react'

export default function Filter() {
  const { filterState, filterDispatch } = useContext(CartContext)
  return (
    <div className='filter-container'>
      <h3 className='mb-3'>Filter Products</h3>
      <Form>
        <Form.Check
          id='radio-asc'
          type='radio'
          name='group1'
          label='Ascending'
          checked={filterState.sort === 'ascending'}
          onChange={() =>
            filterDispatch({ type: 'SORT_BY_PRICE', payload: 'ascending' })
          }
        />
        <Form.Check
          id='radio-desc'
          type='radio'
          name='group1'
          label='Descending'
          checked={filterState.sort === 'descending'}
          onChange={() =>
            filterDispatch({ type: 'SORT_BY_PRICE', payload: 'descending' })
          }
        />
        <Form.Check
          id='cb-oos'
          type='checkbox'
          label='Include Out of Stock'
          checked={filterState.byOOStock}
          onChange={(e) =>
            filterDispatch({
              type: 'INCLUDE_OO_STOCK',
              payload: e.target.checked,
            })
          }
        />
        <Form.Check
          id='cb-fdo'
          type='checkbox'
          label='Fast Delivery Only'
          checked={filterState.byFastDelivery}
          onChange={(e) =>
            filterDispatch({
              type: 'FAST_DELIVERY_ONLY',
              payload: e.target.checked,
            })
          }
        />
      </Form>
      <div className='mt-3'>
        <span className='me-1'>Rating:</span>
        <Rating />
      </div>

      <Button
        className='d-block w-100 mt-4'
        variant='light'
        onClick={() => filterDispatch({ type: 'CLEAR' })}
      >
        Clear Filters
      </Button>
    </div>
  )
}
