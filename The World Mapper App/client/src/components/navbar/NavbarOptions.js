import React from 'react'
import { LOGOUT } from '../../cache/mutations'
import { useMutation, useApolloClient } from '@apollo/client'
import { WButton, WNavItem } from 'wt-frontend'
import { useHistory } from 'react-router'

const LoggedIn = (props) => {
  const client = useApolloClient()
  const [Logout] = useMutation(LOGOUT)
  let history = useHistory()
  const handleLogout = async (e) => {
    Logout()
    const { data } = await props.fetchUser()
    if (data) {
      let reset = await client.resetStore()
      history.push('/')
      if (reset) props.setActiveRegion({})
    }
  }

  //   const dataInfo = getUsername()

  return (
    <>
      <WNavItem hoverAnimation='lighten'>
        <WButton
          className='navbar-options'
          onClick={props.setShowUpdate}
          wType='texted'
          hoverAnimation='text-primary'
          style={{ color: 'orange' }}
        >
          {props.user.name}
        </WButton>
      </WNavItem>
      <WNavItem hoverAnimation='lighten'>
        <WButton
          className='navbar-options'
          onClick={handleLogout}
          wType='texted'
          hoverAnimation='text-primary'
        >
          Logout
        </WButton>
      </WNavItem>
    </>
  )
}

const LoggedOut = (props) => {
  return (
    <>
      <WNavItem hoverAnimation='lighten'>
        <WButton
          className='navbar-options'
          onClick={props.setShowCreate}
          wType='texted'
          hoverAnimation='text-primary'
          style={{ color: '#ec88df' }}
        >
          Create Account
        </WButton>
      </WNavItem>
      <WNavItem hoverAnimation='lighten'>
        <WButton
          className='navbar-options'
          onClick={props.setShowLogin}
          wType='texted'
          //   hoverAnimation='text-primary'
          style={{ fontWeight: 'bold' }}
        >
          Login
        </WButton>
      </WNavItem>
    </>
  )
}

const NavbarOptions = (props) => {
  return (
    <>
      {props.auth === false ? (
        <LoggedOut
          setShowLogin={props.setShowLogin}
          setShowCreate={props.setShowCreate}
          user={props.user}
          setActiveRegion={props.setActiveRegion}
        />
      ) : (
        <LoggedIn
          fetchUser={props.fetchUser}
          setActiveRegion={props.setActiveRegion}
          setShowUpdate={props.setShowUpdate}
          logout={props.logout}
          user={props.user}
        />
      )}
    </>
  )
}

export default NavbarOptions
