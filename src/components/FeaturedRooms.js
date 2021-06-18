import React, { Component } from 'react'
import { RoomContext } from '../Context'
export default class FeaturedRooms extends Component {
  static contextType = RoomContext
  render() {
    const { name, price } = this.context
    return (
      <div>
        <h1>{name}</h1>
        <h1>{price}</h1>
      </div>
    )
  }
}
