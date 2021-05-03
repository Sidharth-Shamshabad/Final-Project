import React, { useState } from 'react'
import { UPDATE } from '../../cache/mutations'
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

const UpdateAccount = (props) => {
  const name = props.user.name
  const email = props.user.email
  const [input, setInput] = useState({
    email: props.user.email,
    password: '',
    name: props.user.name,
  })
  const [loading, toggleLoading] = useState(false)
  const [Update] = useMutation(UPDATE)

  const updateInput = (e) => {
    const { name, value } = e.target
    const updated = { ...input, [name]: value }
    setInput(updated)
  }

  const handleUpdateAccount = async (e) => {
    for (let field in input) {
      if (!input[field]) {
        alert('All fields must be filled out to update')
        return
      }
    }
    const _id = props.user._id
    const { loading, error, data } = await Update({
      variables: { _id, ...input },
    })
    if (loading) {
      toggleLoading(true)
    }
    if (error) {
      return `Error: ${error.message}`
    }
    if (data) {
      console.log(data)
      toggleLoading(false)
      //   if (data.register.email === 'already exists') {
      //     alert('User with that email already registered')
      //   } else {
      //     props.fetchUser()
      //   }
      props.setShowUpdate(false)
      props.fetchUser()
    }
  }

  return (
    <WModal className='signup-modal' cover='true' visible={props.setShowUpdate}>
      <WMHeader
        className='modal-header'
        style={{ backgroundColor: 'red', fontWeight: 'bold' }}
        onClose={() => props.setShowUpdate(false)}
      >
        Enter Updated Account Information
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
            defaultValue={props.user.name}
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
            defaultValue={props.user.email}
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
          onClick={handleUpdateAccount}
          span
          clickAnimation='ripple-light'
          hoverAnimation='fill'
          shape='rounded'
          color='secondary'
        >
          Update
        </WButton>
        <WButton
          className='modal-button cancel-account-button'
          onClick={() => props.setShowUpdate(false)}
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

export default UpdateAccount
