import React, { useState } from 'react'
import { REGISTER } from '../../cache/mutations'
import { useMutation } from '@apollo/client'

import {
  WModal,
  WMHeader,
  WMMain,
  WMFooter,
  WButton,
  WInput,
  WRow,
  WCol,
} from 'wt-frontend'

const CreateAccount = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [loading, toggleLoading] = useState(false)
  const [Register] = useMutation(REGISTER)

  const updateInput = (e) => {
    const { name, value } = e.target
    const updated = { ...input, [name]: value }
    setInput(updated)
  }

  const handleCreateAccount = async (e) => {
    for (let field in input) {
      if (!input[field]) {
        alert('All fields must be filled out to register')
        return
      }
    }
    const { loading, error, data } = await Register({ variables: { ...input } })
    if (loading) {
      toggleLoading(true)
    }
    if (error) {
      return `Error: ${error.message}`
    }
    if (data) {
      console.log(data)
      toggleLoading(false)
      if (data.register.email === 'already exists') {
        alert('User with that email already registered')
      } else {
        props.fetchUser()
      }
      props.setShowCreate(false)
    }
  }

  return (
    <WModal className='signup-modal' cover='true' visible={props.setShowCreate}>
      <WMHeader
        className='modal-header'
        style={{ backgroundColor: 'red', fontWeight: 'bold' }}
        onClose={() => props.setShowCreate(false)}
      >
        Create a New Account
      </WMHeader>

      {loading ? (
        <div />
      ) : (
        <WMMain style={{ backgroundColor: 'black' }}>
          <WInput
            className='modal-input'
            onBlur={updateInput}
            name='name'
            labelAnimation='up'
            barAnimation='solid'
            labelText='Name'
            wType='outlined'
            inputType='text'
          />
          <div className='modal-spacer'>&nbsp;</div>
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
        </WMMain>
      )}
      <WMFooter
        style={{
          display: 'flex',
          flexDirection: 'horizontal',
          backgroundColor: 'black',
        }}
      >
        <WButton
          className='modal-button cancel-account-button'
          onClick={handleCreateAccount}
          span
          clickAnimation='ripple-light'
          hoverAnimation='fill'
          shape='rounded'
          color='secondary'
        >
          Submit
        </WButton>
        <WButton
          className='modal-button cancel-account-button'
          onClick={() => props.setShowCreate(false)}
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

export default CreateAccount
