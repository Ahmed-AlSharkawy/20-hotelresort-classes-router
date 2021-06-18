import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Services from '../components/Services'

const Home = () => {
  return (
    <>
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
      <Services />
    </>
  )
}
export default Home
