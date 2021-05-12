import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'

const TableEntry = (props) => {
  const { entry } = props
  const [landmarks, setLandmarks] = useState('No Landmarks')
  console.log(entry)

  const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: entry },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })
  let subregion = {}
  if (data) {
    subregion = data.getRegionById
  }

  const name = subregion.name
  const capital = subregion.capital
  const leader = subregion.leader

  const [editingName, toggleNameEdit] = useState(false)
  const [editingCapital, toggleCapitalEdit] = useState(false)
  const [editingLeader, toggleLeaderEdit] = useState(false)

  // const disabledButton = () => {}

  const handleGoToSubregion = (e) => {}

  const handleNameEdit = (e) => {
    e.stopPropagation()
    toggleNameEdit(false)
    const newName = e.target.value ? e.target.value : 'Untitled'
    const prevName = name
    if (newName !== prevName) {
      props.editSubregion(subregion._id, 'name', newName, prevName)
    }
  }

  const handleCapitalEdit = (e) => {
    e.stopPropagation()
    toggleCapitalEdit(false)
    const newCapital = e.target.value ? e.target.value : 'Untitled'
    const prevCapital = capital
    if (newCapital !== prevCapital) {
      props.editSubregion(subregion._id, 'capital', newCapital, prevCapital)
    }
  }

  const handleLeaderEdit = (e) => {
    e.stopPropagation()
    toggleLeaderEdit(false)
    const newLeader = e.target.value ? e.target.value : 'Untitled'
    const prevLeader = leader
    if (newLeader !== prevLeader) {
      props.editSubregion(subregion._id, 'leader', newLeader, prevLeader)
    }
  }

  let history = useHistory()

  return (
    <WRow
      className='table-entry'
      style={{ backgroundColor: 'gray', alignItems: 'center' }}
    >
      <WCol size='3' className='pointer'>
        {editingName || name === '' ? (
          <WInput
            className='table-input'
            onBlur={handleNameEdit}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleNameEdit(e)
            }}
            autoFocus={true}
            defaultValue={name}
            type='text'
            inputClass='table-input-class'
          />
        ) : (
          <div
            style={{ display: 'flex', height: '100%', alignItems: 'center' }}
          >
            <WButton
              wType='texted'
              className='table-header-button'
              clickAnimation={props.disabled ? '' : 'ripple-light'}
              style={{ color: 'black', marginLeft: '0px' }}
            >
              <i className='material-icons'>delete_outline</i>
            </WButton>
            <div
              style={{ height: '100%', width: '100%', alignItems: 'center' }}
              onClick={() => {
                toggleNameEdit(!editingName)
              }}
              onDoubleClick={() => {
                history.push(`/regions/${subregion._id}`)
              }}
            >
              {subregion.name}
            </div>
          </div>
        )}
      </WCol>

      <WCol size='2' className='pointer'>
        {editingCapital || capital === '' ? (
          <WInput
            className='table-input'
            onBlur={handleCapitalEdit}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleCapitalEdit(e)
            }}
            autoFocus={true}
            defaultValue={capital}
            type='text'
            inputClass='table-input-class'
          />
        ) : (
          <div
            style={{ display: 'flex', height: '100%', alignItems: 'center' }}
          >
            <div
              style={{ height: '100%', width: '100%' }}
              onClick={() => {
                toggleCapitalEdit(!editingCapital)
              }}
              onDoubleClick={() => {
                history.push(`/regions/${subregion._id}`)
              }}
            >
              {subregion.capital}
            </div>
          </div>
        )}
      </WCol>

      <WCol size='2' className='pointer'>
        {editingLeader || leader === '' ? (
          <WInput
            className='table-input'
            onBlur={handleLeaderEdit}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleLeaderEdit(e)
            }}
            autoFocus={true}
            defaultValue={leader}
            type='text'
            inputClass='table-input-class'
          />
        ) : (
          <div
            style={{ display: 'flex', height: '100%', alignItems: 'center' }}
          >
            <div
              style={{ height: '100%', width: '100%' }}
              onClick={() => {
                toggleLeaderEdit(!editingLeader)
              }}
              onDoubleClick={() => {
                history.push(`/regions/${subregion._id}`)
              }}
            >
              {subregion.leader}
            </div>
          </div>
        )}
      </WCol>

      <WCol size='2'>{subregion.flag}</WCol>
      <WCol
        size='3'
        className='pointer'
        onClick={() => {
          history.push(`/subregion/${subregion._id}`)
        }}
      >
        {landmarks}
      </WCol>
    </WRow>
  )
}

export default TableEntry
