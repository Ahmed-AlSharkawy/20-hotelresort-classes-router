import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Room({ room }) {
  const { name, slug, images, price, size, type, capacity } = room
  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0]} alt={name} />
        <div className='price-top price-top-left'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <div className='price-top price-top-right'>
          <h6>{size}</h6>
          <p>SQFT</p>
        </div>
        <div className='price-top price-bottom-left'>
          <h6>{type}</h6>
          <p>room</p>
        </div>
        <div className='price-top price-bottom-right'>
          <h6>{capacity}</h6>
          <p>{`${capacity > 1 ? 'people' : 'person'}`}</p>
        </div>
        <Link to={`/rooms/${slug}`} className='btn-primary room-link'>
          Features
        </Link>
      </div>
      <p className='room-info'>{name}</p>
    </article>
  )
}
Room.propTypes = {
  room: propTypes.shape({
    name: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
    images: propTypes.arrayOf(propTypes.string).isRequired,
    price: propTypes.number.isRequired,
  }),
}
