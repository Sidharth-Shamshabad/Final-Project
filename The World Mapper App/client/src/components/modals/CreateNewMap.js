import React, { useState } from 'react'
import { CREATE_MAP_FILE } from '../../cache/mutations'
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

const CreateNewMap = (props) => {
  const [input, setInput] = useState({
    name: '',
  })
  const [loading, toggleLoading] = useState(false)
  const [CreateMapFile] = useMutation(CREATE_MAP_FILE)

  const updateInput = (e) => {
    const { name, value } = e.target
    const updated = { ...input, [name]: value }
    setInput(updated)
  }

  const handleCreateMapFile = async (e) => {
    for (let field in input) {
      if (!input[field]) {
        alert('All fields must be filled out to create map file.')
        return
      }
    }
    const length = props.regions.length
    const id =
      length >= 1
        ? props.regions[length - 1].id + Math.floor(Math.random() * 100 + 1)
        : 1

    const name = { ...input }
    console.log(name.name)
    let region = {
      _id: '',
      id: id,
      name: name.name,
      owner: props.user._id,
      parentRegion: 'none',
      subregions: [],
      capital: 'none',
      leader: 'none',
      flag: 'none',
      landmarks: [],
      sortRule: 'none',
      sortDirection: 0,
    }

    const { loading, error, data } = await CreateMapFile({
      variables: { region },
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
      props.fetchUser()
      // props.refetchRegions(props.refetchRegionsRefetch)
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
        Create a New Map File
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
          onClick={handleCreateMapFile}
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

export default CreateNewMap
