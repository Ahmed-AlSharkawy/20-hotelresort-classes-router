import React from 'react'

const Banner = ({ children, title, subtitle }) => {
  return (
    <div className='banner'>
      <h2>{title}</h2>
      <div />
      <p>{subtitle}</p>
      {children}
    </div>
  )
}
export default Banner
