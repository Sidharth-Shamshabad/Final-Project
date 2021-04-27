import React from 'react'
import { LOGOUT } from '../../cache/mutations'
import { useMutation, useApolloClient } from '@apollo/client'
import { WButton, WNavItem } from 'wt-frontend'

const LoggedIn = (props) => {
  const client = useApolloClient()
  const [Logout] = useMutation(LOGOUT)

  const handleLogout = async (e) => {
    Logout()
    const { data } = await props.fetchUser()
    if (data) {
      let reset = await client.resetStore()
      if (reset) props.setActiveList({})
    }
  }

  const getUsername = async (e) => {
    const { data } = await props.fetchUser()
    if (data) {
      return data
    }
  }

  //   const dataInfo = getUsername()
  console.log('This is data from NavbarOptions', props)

  return (
    <>
      <WNavItem hoverAnimation='lighten'>
        <WButton
          className='navbar-options'
          //   onClick={props.setShowCreate}
          wType='texted'
          hoverAnimation='text-primary'
          style={{ color: '#ec88df' }}
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
        />
      ) : (
        <LoggedIn
          fetchUser={props.fetchUser}
          setActiveList={props.setActiveList}
          logout={props.logout}
          user={props.user}
        />
      )}
    </>
  )
}

export default NavbarOptions
