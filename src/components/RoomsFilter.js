import React, { useContext } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'

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

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext)

  const {
    handleChange,
    sortRooms,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context

  return (
    <section className='filter-container'>
      <Title title='Find your Room' />
      <form className='filter-form'>
        {/*  select type */}
        <div className='form-group'>
          <label htmlFor='type'>Room Type</label>
          <select
            name='type'
            id='type'
            value={type}
            className='form-control'
            onChange={handleChange}
          >
            {mapItems(rooms, 'type', 'all')}
          </select>
          {/*  end select type */}
        </div>
        {/*  select capacity */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guests</label>
          <select
            name='capacity'
            id='capacity'
            value={capacity}
            className='form-control'
            onChange={handleChange}
          >
            {mapItems(rooms, 'capacity')}
          </select>
        </div>
        {/*  end select capacity */}
        {/*  select price */}
        <div className='form-group'>
          <label htmlFor='price'>Room Price ${price}</label>
          <input
            type='range'
            name='price'
            id='price'
            min={minPrice}
            max={maxPrice}
            value={price}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        {/*  end select price */}
        {/*  select size */}
        <div className='form-group'>
          <label htmlFor='size'>Room Size</label>
          <div className='size-inputs'>
            <input
              type='number'
              name='minSize'
              id='size'
              value={minSize}
              className='size-input'
              onChange={handleChange}
            />
            <input
              type='number'
              name='maxSize'
              id='size'
              value={maxSize}
              className='size-input'
              onChange={handleChange}
            />
          </div>
        </div>
        {/*  end select size */}
        {/*  select extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>Breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='pets'>Pets</label>
          </div>
        </div>
        {/*  end select extras */}
      </form>
    </section>
  )
}
