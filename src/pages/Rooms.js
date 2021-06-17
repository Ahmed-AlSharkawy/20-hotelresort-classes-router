import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
const Rooms = () => {
  return (
    <Hero hero='roomsHero'>
      <Banner title='Welcome to Rooms'>
        <Link to='/' className='btn-primary'>
          Back to doorstep
        </Link>
      </Banner>
    </Hero>
  )
}
export default Rooms
