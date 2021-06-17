import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <Hero>
      <Banner
        title='Best Islamic rooms'
        subtitle='Descover best rooms for Halal tourism starting from 20 Dinars'
      >
        <Link to='/rooms' className='btn-primary'>
          Our Rooms
        </Link>
      </Banner>
    </Hero>
  )
}
export default Home
