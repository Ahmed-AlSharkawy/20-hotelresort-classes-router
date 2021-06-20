import React, { useContext } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'

/* 
const getUniqueItems = (items, value) => {
  return [...new Set(items.map((item) => item[value]))]
}

const mapItems = (searchItems, value, extra = null) => {
  let results = getUniqueItems(searchItems, value)
  if (extra) results = [extra, ...results]
  results = results.map((result, index) => {
    return (
      <option key={index} value={result}>
        {result}
      </option>
    )
  })
  return results
} 
*/

export default function RoomsOrder() {
  const context = useContext(RoomContext)

  const {
    handleOrderChange,
    nameOrder,
    nameOrderDes,
    priceOrder,
    priceOrderDes,
    typeOrder,
    typeOrderDes,
    sizeOrder,
    sizeOrderDes,
    capacityOrder,
    capacityOrderDes,

    breakfast,
    pets,
  } = context

  // name price type size capacity
  return (
    <section className='order-container'>
      <Title title='Sort Results' />
      <form className='order-form'>
        <div className='order-form-group'>
          <input
            type='checkbox'
            name='nameOrder'
            id='nameOrder'
            checked={nameOrder}
            onChange={handleOrderChange}
          />
          <label htmlFor='nameOrder'>Name</label>
          <div className='order-form-des'>
            <input
              type='checkbox'
              name='nameOrderDes'
              id='nameOrderDes'
              checked={nameOrderDes}
              onChange={handleOrderChange}
            />
            <label htmlFor='nameOrderDes'>Des</label>
          </div>
        </div>
        <div className='order-form-group'>
          <input
            type='checkbox'
            name='priceOrder'
            id='priceOrder'
            checked={priceOrder}
            onChange={handleOrderChange}
          />
          <label htmlFor='priceOrder'>Price</label>
          <div className='order-form-des'>
            <input
              type='checkbox'
              name='priceOrderDes'
              id='priceOrderDes'
              checked={priceOrderDes}
              onChange={handleOrderChange}
            />
            <label htmlFor='priceOrderDes'>Des</label>
          </div>
        </div>
        <div className='order-form-group'>
          <input
            type='checkbox'
            name='typeOrder'
            id='typeOrder'
            checked={typeOrder}
            onChange={handleOrderChange}
          />
          <label htmlFor='typeOrder'>Type</label>
          <div className='order-form-des'>
            <input
              type='checkbox'
              name='typeOrderDes'
              id='typeOrderDes'
              checked={typeOrderDes}
              onChange={handleOrderChange}
            />
            <label htmlFor='typeOrderDes'>Des</label>
          </div>
        </div>
        <div className='order-form-group'>
          <input
            type='checkbox'
            name='sizeOrder'
            id='sizeOrder'
            checked={sizeOrder}
            onChange={handleOrderChange}
          />
          <label htmlFor='sizeOrder'>Size</label>
          <div className='order-form-des'>
            <input
              type='checkbox'
              name='sizeOrderDes'
              id='sizeOrderDes'
              checked={sizeOrderDes}
              onChange={handleOrderChange}
            />
            <label htmlFor='sizeOrderDes'>Des</label>
          </div>
        </div>
        <div className='order-form-group'>
          <input
            type='checkbox'
            name='capacityOrder'
            id='capacityOrder'
            checked={capacityOrder}
            onChange={handleOrderChange}
          />
          <label htmlFor='capacityOrder'>Guests</label>
          <div className='order-form-des'>
            <input
              type='checkbox'
              name='capacityOrderDes'
              id='capacityOrderDes'
              checked={capacityOrderDes}
              onChange={handleOrderChange}
            />
            <label htmlFor='capacityOrderDes'>Des</label>
          </div>
        </div>
      </form>
    </section>
  )
}
