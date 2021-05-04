import React, { useState } from 'react'
import { LOGIN } from '../../cache/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_DB_REGIONS } from '../../cache/queries'

import {
  WModal,
  WMHeader,
  WMMain,
  WMFooter,
  WButton,
  WInput,
} from 'wt-frontend'

const Login = (props) => {
  const [input, setInput] = useState({ email: '', password: '' })
  const [loading, toggleLoading] = useState(false)
  const [showErr, displayErrorMsg] = useState(false)
  const errorMsg = 'Email/Password not found.'
  const [Login] = useMutation(LOGIN)

  const updateInput = (e) => {
    const { name, value } = e.target
    const updated = { ...input, [name]: value }
    setInput(updated)
  }

  const handleLogin = async (e) => {
    const { loading, error, data } = await Login({
      variables: { ...input },
      refetchQueries: [{ query: GET_DB_REGIONS }],
    })
    if (loading) {
      toggleLoading(true)
    }
    if (data.login._id === null) {
      displayErrorMsg(true)
      return
    }
    if (data) {
      props.fetchUser()
      // props.reloadRegions()
      toggleLoading(false)
      props.setShowLogin(false)
    }
  }

  return (
    <WModal className='login-modal' cover='true' visible={props.setShowLogin}>
      <WMHeader
        className='modal-header'
        style={{ backgroundColor: 'red', fontWeight: 'bold' }}
        onClose={() => props.setShowLogin(false)}
      >
        Login To Your Account
      </WMHeader>

      {loading ? (
        <div />
      ) : (
        <WMMain className='main-login-modal'>
          <WInput
            className='modal-input'
            onBlur={updateInput}
            name='email'
            labelAnimation='up'
            barAnimation='solid'
            labelText='Email Address'
            wType='outlined'
            inputType='text'
          />
          <div className='modal-spacer'>&nbsp;</div>
          <WInput
            className='modal-input'
            onBlur={updateInput}
            name='password'
            labelAnimation='up'
            barAnimation='solid'
            labelText='Password'
            wType='outlined'
            inputType='password'
          />

          {showErr ? (
            <div className='modal-error'>{errorMsg}</div>
          ) : (
            <div className='modal-error'>&nbsp;</div>
          )}
        </WMMain>
      )}
      <WMFooter style={{ display: 'flex', flexDirection: 'horizontal' }}>
        <WButton
          className='modal-button cancel-account-button'
          onClick={handleLogin}
          span
          clickAnimation='ripple-light'
          hoverAnimation='fill'
          shape='rounded'
          color='secondary'
        >
          Login
        </WButton>
        <WButton
          className='modal-button cancel-account-button'
          onClick={() => props.setShowLogin(false)}
          span
          clickAnimation='ripple-light'
          hoverAnimation='fill'
          shape='rounded'
          color='secondary'
          style={{ marginLeft: '100px' }}
        >
          Cancel
        </WButton>
      </WMFooter>
    </WModal>
  )
}

export default Login
