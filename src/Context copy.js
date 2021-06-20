import React, { Children, Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    orderedRooms: [],
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
    isOrdered: false,
    nameOrder: false,
    nameOrderDes: false,
    priceOrder: false,
    priceOrderDes: false,
    typeOrder: false,
    typeOrderDes: false,
    sizeOrder: false,
    sizeOrderDes: false,
    capacityOrder: false,
    capacityOrderDes: false,
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

  handleOrderChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState(
      {
        [event.target.name]: event.target.checked,
      },
      this.orderRooms
    )
  }

  orderRooms() {
    let tempRooms = [...this.state.sortedRooms]

    if (tempRooms.length > 0) {
      let {
        type,
        size,
        capacity,
        name,
        nameOrder,
        nameOrderDes,
        priceOrder,
        priceOrderDes,
        typeOrder,
        typeOrderDes,
        sizeOrder,
        sizeOrderDes,
        capacityOrder,
        capacityOrderDes,
      } = this.state

      /*
        - first check if the name filter is set as the names are unique
          - if so ignore other filters and handle just this one
          - simply call "orderByString" method
        - if not handle other filters
        - start handling from the last one, so check if it is set
        - if so check the first previous filter set to true
          - call the the method that handles it
          - then order the results to the last filter
          - if it is the only filter that is set just call the corressponding method
          - that is gonna be "orderByString" or "orderByNumber"
        - if not check the previous one and repeat the process
        - keep repeat this till the first "un-unique" filter
      */

      // order by name (names don't duplicate)
      if (nameOrder) {
        tempRooms = this.orderByString([...tempRooms], nameOrderDes, 'name')
      }
      // if name not set handle remain props from last to first
      // order by capacity
      else if (capacityOrder) tempRooms = this.orderByCapacity([...tempRooms])
      // order by size
      else if (sizeOrder) tempRooms = this.orderBySize([...tempRooms])
      // order by type
      else if (typeOrder) tempRooms = this.orderByType([...tempRooms])
      // price is the first un-unique filter field
      // order by price
      else if (priceOrder) tempRooms = this.orderByPrice([...tempRooms])

      this.setState({
        orderedRooms: tempRooms,
        isOrdered: true,
      })
    }
  }

  orderByCapacity(rooms) {
    const { priceOrder, typeOrder, sizeOrder, capacityOrderDes } = this.state
    if (sizeOrder) {
      this.orderBySize(rooms)
      return rooms.sort((first, second) =>
        (priceOrder &&
          typeOrder &&
          first.price === second.price &&
          first.type === second.type &&
          first.size === second.size) ||
        (priceOrder &&
          !typeOrder &&
          first.price === second.price &&
          first.size === second.size) ||
        (!priceOrder &&
          typeOrder &&
          first.type === second.type &&
          first.size === second.size) ||
        (!priceOrder && !typeOrder && first.size === second.size)
          ? this.compareNumbers(
              first.capacity,
              second.capacity,
              capacityOrderDes
            )
          : null
      )
    } else if (typeOrder) {
      this.orderByType(rooms)
      return rooms.sort((first, second) =>
        (priceOrder &&
          first.price === second.price &&
          first.type === second.type) ||
        (!priceOrder && first.type === second.type)
          ? this.compareNumbers(
              first.capacity,
              second.capacity,
              capacityOrderDes
            )
          : null
      )
    } else if (priceOrder) {
      this.orderByPrice(rooms)
      return rooms.sort((first, second) =>
        first.price === second.price
          ? this.compareNumbers(
              first.capacity,
              second.capacity,
              capacityOrderDes
            )
          : null
      )
    } else return this.orderByNumber(rooms, capacityOrderDes, 'capacity')
  }

  orderBySize(rooms) {
    const { priceOrder, typeOrder, sizeOrderDes } = this.state
    if (typeOrder) {
      this.orderByType(rooms)
      return rooms.sort((first, second) =>
        (priceOrder &&
          first.price === second.price &&
          first.type === second.type) ||
        (!priceOrder && first.type === second.type)
          ? this.compareNumbers(first.size, second.size, sizeOrderDes)
          : null
      )
    } else if (priceOrder) {
      this.orderByPrice(rooms)
      return rooms.sort((first, second) =>
        first.price === second.price
          ? this.compareNumbers(first.size, second.size, sizeOrderDes)
          : null
      )
    } else return this.orderByNumber(rooms, sizeOrderDes, 'size')
  }

  orderByType = (rooms) => {
    const { priceOrder, typeOrderDes } = this.state
    if (priceOrder) {
      this.orderByPrice(rooms)
      return rooms.sort((first, second) =>
        first.price === second.price
          ? this.compareStrings(first.type, second.type, typeOrderDes)
          : null
      )
    } else return this.orderByString(rooms, typeOrderDes, 'type')
  }

  orderByPrice = (rooms) =>
    this.orderByNumber(rooms, this.state.priceOrderDes, 'price')

  compareNumbers(first, second, check) {
    if (check) return second - first
    return first - second
  }

  compareStrings(first, second, check) {
    if (check) return second.localeCompare(first)
    return first.localeCompare(second)
  }

  orderByString(rooms, check, prop) {
    if (check)
      return rooms.sort((first, second) =>
        second[prop].localeCompare(first[prop])
      )
    else
      return rooms.sort((first, second) =>
        first[prop].localeCompare(second[prop])
      )
  }

  orderByNumber(rooms, check, prop) {
    if (check) return rooms.sort((first, second) => second[prop] - first[prop])
    else return rooms.sort((first, second) => first[prop] - second[prop])
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          resetFilters: this.resetFilters,
          handleOrderChange: this.handleOrderChange,
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
