import React, { Component } from 'react'
import Title from './Title'
import ServicesData from '../ServicesData'

export default class Services extends Component {
  state = {
    services: ServicesData,
  }

  render() {
    return (
      <section className='services'>
        <Title title='Services' />
        <div className='services-center'>
          {this.state.services.map((service) => {
            const { id, icon1, icon2, title, info } = service
            return (
              <article key={id} class='service'>
                <span>
                  {icon1} {icon2}
                </span>

                <h6>{title}</h6>
                <p>{info}</p>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
}
