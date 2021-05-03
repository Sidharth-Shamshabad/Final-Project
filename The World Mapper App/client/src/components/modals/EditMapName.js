import React, { useState } from 'react'
import { EDIT_MAP_FILE } from '../../cache/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_DB_REGIONS } from '../../cache/queries'

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
  const [EditMapFile] = useMutation(EDIT_MAP_FILE)

  const updateInput = (e) => {
    const { name, value } = e.target
    const updated = { ...input, [name]: value }
    setInput(updated)
  }

  const handleEditMapFile = async (e) => {
    for (let field in input) {
      if (!input[field]) {
        alert('All fields must be filled out to edit map file.')
        return
      }
    }
    const _id = props.region._id
    const field = 'name'
    const value = input.name

    console.log(value)

    const { loading, error, data } = await EditMapFile({
      variables: { _id, field, value },
      refetchQueries: [{ query: GET_DB_REGIONS }],
    })

    props.setShowEdit(false)

    // const length = props.regions.length
    // const id =
    //   length >= 1
    //     ? props.regions[length - 1].id + Math.floor(Math.random() * 100 + 1)
    //     : 1

    // const name = { ...input }
    // console.log(name.name)
    // let region = {
    //   _id: '',
    //   id: id,
    //   name: name.name,
    //   owner: props.user._id,
    //   parentRegion: 'none',
    //   subregions: [],
    //   capital: 'none',
    //   leader: 'none',
    //   flag: 'none',
    //   landmarks: [],
    //   sortRule: 'none',
    //   sortDirection: 0,
    // }

    // const { loading, error, data } = await CreateMapFile({
    //   variables: { region },
    //   refetchQueries: [{ query: GET_DB_REGIONS }],
    // })
    // if (loading) {
    //   toggleLoading(true)
    // }
    // if (error) {
    //   return `Error: ${error.message}`
    // }
    // if (data) {
    //   console.log(data)
    //   toggleLoading(false)
    //   props.fetchUser()
    //   // props.refetchRegions(props.refetchRegionsRefetch)
    //   props.setShowEdit(false)
    // }
  }

  return (
    <WModal className='signup-modal' cover='true' visible={props.setShowEdit}>
      <WMHeader
        className='modal-header'
        style={{ backgroundColor: 'red', fontWeight: 'bold' }}
        onClose={() => props.setShowEdit(false)}
      >
        Edit Map File Name
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
          onClick={handleEditMapFile}
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
          onClick={() => props.setShowEdit(false)}
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
