import React from 'react'
// import { RoomConsumer } from '../Context'
import { consumerHolder } from '../Context'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import Loading from './Loading'

function RoomsContainer({ context }) {
  const { rooms, sortedRooms, isLoading } = context

  if (isLoading) return <Loading />

  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
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
