import React from 'react'
import { consumerHolder } from '../Context'
import RoomsFilter from './RoomsFilter'
import RoomsOrder from './RoomsOrder'
import RoomsList from './RoomsList'
import Loading from './Loading'

function RoomsContainer({ context }) {
  const { rooms, sortedRooms, orderedRooms, isOrdered, isLoading } = context

  if (isLoading) return <Loading />

  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsOrder />

      <RoomsList rooms={isOrdered ? orderedRooms : sortedRooms} />
    </div>
  )

  /* 
  return (
    <RoomConsumer>
      {(value) => {
        const { rooms, sortedRooms, isLoading } = value

        if (isLoading) return <Loading />

        return (
          <div>
            Rooms Contanier
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
          </div>
        )
      }}
    </RoomConsumer> 
  )
  */
}

export default consumerHolder(RoomsContainer)
