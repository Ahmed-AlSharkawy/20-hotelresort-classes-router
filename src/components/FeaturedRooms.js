import React, { Component } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'
import Loading from './Loading'
import Room from './Room'

export default class FeaturedRooms extends Component {
  static contextType = RoomContext

  render() {
    let { isLoading, featuredRooms: rooms } = this.context

    rooms = rooms.map((room) => {
      return <Room key={room.id} room={room} />
    })

    return (
      <div className='featured-rooms'>
        <Title title='Featured Rooms' />
        <div className='featured-rooms-center'>
          {isLoading ? <Loading /> : rooms}
        </div>
      </div>
    )
  }
}
