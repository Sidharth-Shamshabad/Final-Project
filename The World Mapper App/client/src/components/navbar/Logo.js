import React from 'react'
import { useHistory } from 'react-router'

const Logo = (props) => {
  let history = useHistory()
  return <div className='logo'>The World Data Mapper</div>
}

export default Logo
