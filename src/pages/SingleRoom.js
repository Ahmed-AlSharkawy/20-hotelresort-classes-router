import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { RoomContext } from '../Context'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'
import defaultBcg from '../images/room-1.jpeg'

export default class SingleRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: this.props.match.params.roomName,
      defaultBcg,
    }
  }

  static contextType = RoomContext

  // componentDidMount() {}

  render() {
    const room = this.context.getRoom(this.state.slug)

    if (!room) {
      return (
        <Hero hero='noRoomHero'>
          <Banner title='OPPS!' subtitle="We don't have this room">
            <Link to='/rooms' className='btn-primary'>
              Try another room
            </Link>
          </Banner>
        </Hero>
      )
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room

    const [mainImage, ...restImages] = images
    return (
      <>
        <StyledHero image={mainImage /*images[0]*/ || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className='btn-primary'>
              Back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className='single-room'>
          <div className='single-room-images'>
            {restImages.map((image, index) => {
              return <img key={index} src={image} alt={name} />
            })}
          </div>
          <div className='single-room-info'>
            <article className='desc'>
              <h3>Details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>Price : ${price}</h6>
              <h6>Size : {size} SQFT</h6>
              <h6>
                Max Capacity :{' '}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? 'Pets Allowed' : 'No Pets Allowed'}</h6>
              <h6>{breakfast && 'Free Breakfast Included'}</h6>
            </article>
          </div>
        </section>
        <section className='room-extras'>
          <h6>Extras</h6>
          <ul className='extras'>
            {extras.map((extra, index) => {
              return <li key={index}>- {extra}</li>
            })}
          </ul>
        </section>
      </>
    )
  }
}
