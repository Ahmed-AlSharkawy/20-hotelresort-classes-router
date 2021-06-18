import React, { Component } from 'react'
import { RoomContext } from '../Context'
import Loading from './Loading'
import Room from './Room'

export default class FeaturedRooms extends Component {
  static contextType = RoomContext

  render() {
    const { featuredRooms } = this.context

    const { name, price } = this.context
    return (
      <div>
        <Room />
        <Loading />
      </div>
    )
  }
}
