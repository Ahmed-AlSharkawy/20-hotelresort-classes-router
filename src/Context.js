import React, { Children, Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    isLoading: true,
  }

  componentDidMount() {
    const rooms = this.formatData(items)
    console.log(rooms)
    this.setState({
      rooms,
      sortedRooms: rooms,
      featuredRooms: rooms.filter((room) => room.featured === true),
    })
  }

  formatData(itemsList) {
    return itemsList.map((item) => {
      const id = item.sys.id
      const images = item.fields.images.filter((image) => image.fields.file.url)

      return { id, images, ...item.fields }
    })
  }

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}
const RoomConsumer = RoomContext.Consumer

export { RoomContext, RoomProvider, RoomConsumer }
