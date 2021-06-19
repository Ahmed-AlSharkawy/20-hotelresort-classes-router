import React, { useContext } from 'react'
import { RoomContext } from '../Context'
import Room from './Room'
import Banner from './Banner'

export default function RoomsList({ rooms }) {
  const context = useContext(RoomContext)
  const { resetFilters } = context

  if (rooms.length < 1) {
    return (
      <div style={{ margin: '0rem auto 7rem auto', textAlign: 'center' }}>
        <Banner title='OPPS!' subtitle='No rooms matches your search'>
          <button type='button' className='btn-primary' onClick={resetFilters}>
            Reset Filters
          </button>
        </Banner>
      </div>
    )
  }

  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {rooms.map((room) => {
          return <Room key={room.id} room={room} />
        })}
      </div>
    </section>
  )
}
