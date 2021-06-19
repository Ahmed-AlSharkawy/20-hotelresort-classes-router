import React, { Children, Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    isLoading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  }

  componentDidMount() {
    const rooms = this.formatData(items)

    const featuredRooms = rooms.filter((room) => room.featured === true)

    this.setState(
      {
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        isLoading: false,
        // price: maxPrice,
        // maxPrice,
        // maxSize,
      },
      () => {
        this.resetPriceAndSize()
      }
    )
  }

  resetPriceAndSize() {
    const rooms = this.state.rooms
    const maxPrice = Math.max(...rooms.map((room) => room.price))

    const maxSize = Math.max(...rooms.map((room) => room.size))

    this.setState({
      price: maxPrice,
      maxPrice,
      maxSize,
    })
  }

  formatData(itemsList) {
    return itemsList.map((item) => {
      const id = item.sys.id
      const images = item.fields.images.map((image) => image.fields.file.url)
      return { ...item.fields, id, images }
    })
  }

  getRoom = (slug) => {
    return this.state.rooms.find((room) => room.slug === slug)
  }

  handleChange = (event) => {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (
      name === 'capacity' ||
      name === 'price' ||
      name === 'minPrice' ||
      name === 'maxPrice' ||
      name === 'minSize' ||
      name === 'maxSize'
    )
      value = parseInt(value)
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    )
  }

  filterRooms() {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state

    let tempRooms = [...rooms]

    // filter by type
    if (type !== 'all')
      tempRooms = tempRooms.filter((room) => room.type === type)

    // filter by capacity
    if (capacity !== 1)
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity)

    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price)

    // filter by size
    if (minSize <= maxSize)
      tempRooms = tempRooms.filter(
        (room) => room.size >= minSize && room.size <= maxSize
      )
    else
      tempRooms = tempRooms.filter(
        (room) => room.size >= maxSize && room.size <= minSize
      )

    // filter by extras
    if (breakfast) tempRooms = tempRooms.filter((room) => room.breakfast)

    if (pets) tempRooms = tempRooms.filter((room) => room.pets)

    this.setState({
      sortedRooms: tempRooms,
    })
  }

  resetFilters = () => {
    this.setState({
      sortedRooms: this.state.rooms,
      type: 'all',
      capacity: 1,
      minPrice: 0,
      minSize: 0,
      breakfast: false,
      pets: false,
    })
    this.resetPriceAndSize()
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          resetFilters: this.resetFilters,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

function consumerHolder(BaseComponent) {
  return function consumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <BaseComponent {...props} context={value} />}
      </RoomConsumer>
    )
  }
}

export { RoomContext, RoomProvider, RoomConsumer, consumerHolder }
