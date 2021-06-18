import React from 'react'
import LoadingArrow from '../images/gif/loading-arrow.gif'

export default function Loading() {
  return (
    <div className='loading'>
      <h4>Rooms are loading</h4>
      <img src={LoadingArrow} alt='Loading' />
    </div>
  )
}
