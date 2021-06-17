import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'
import logo from '../images/logo.svg'

export default class Navbar extends Component {
  state = {
    isListOpen: false,
  }

  toggleList = () => {
    this.setState({ isListOpen: !this.state.isListOpen })
  }

  render() {
    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <img src={logo} alt='Beach Resort' />
            </Link>
            <button type='button' className='nav-btn' onClick={this.toggleList}>
              <FaAlignRight className='nav-icon' />
            </button>
          </div>
          <ul className={`nav-links ${this.state.isListOpen && 'show-nav'}`}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/rooms'>Rooms</Link>
            </li>
          </ul>
        </div>
        <div></div>
      </nav>
    )
  }
}
