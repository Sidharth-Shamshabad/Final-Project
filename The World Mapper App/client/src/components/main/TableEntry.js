import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'
import DeleteSubregion from '../modals/DeleteSubregion'

const TableEntry = (props) => {
  const { entry } = props
  const [landmarks, setLandmarks] = useState('No Landmarks')
  // console.log(entry)

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
  const subregionRedirectID = subregion._id

  const [editingName, toggleNameEdit] = useState(false)
  const [editingCapital, toggleCapitalEdit] = useState(false)
  const [editingLeader, toggleLeaderEdit] = useState(false)
  const [showDelete, toggleShowDelete] = useState(false)

  const setShowDelete = () => {
    toggleShowDelete(!showDelete)
  }

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

  const handlePushToLandmarks = (e) => {
    console.log(entry)
    history.push(`/subregion/${entry}`)
  }

  const location = `/subregion/${entry}`

  let history = useHistory()

  let landmarksArr = subregion.landmarks ? subregion.landmarks : []
  let landmarksString = ''
  console.log(landmarksArr)
  for (let i = 0; i < landmarksArr.length; i++) {
    // const element = subregion.landmarks[i]
    // console.log(element)
    landmarksString += landmarksArr[i]
    if (i !== landmarksArr.length - 1) {
      landmarksString += ', '
    }
  }
  console.log(landmarksString)
  // if (landmarksString === '') {
  //   setLandmarks('No Landmarks')
  // } else {
  //   setLandmarks(landmarksString)
  // }

  return (
    <WRow
      className='table-entry'
      style={{ backgroundColor: 'gray', alignItems: 'center' }}
    >
      <WCol
        size='3'
        className='pointer'
        // onClick={() => {
        //   history.push(`/regions/${subregion._id}`)
        // }}
      >
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
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <WButton
              wType='texted'
              className='table-header-button'
              clickAnimation={props.disabled ? '' : 'ripple-light'}
              style={{ color: 'black', marginLeft: '0px', color: 'red' }}
              onClick={setShowDelete}
            >
              <i className='material-icons'>delete_outline</i>
            </WButton>
            <div
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                backgroundColor: 'white',
                marginRight: '10%',
                marginLeft: '1%',
              }}
              onClick={(e) => {
                console.log('single click', e.detail)
                // e.stopPropagation()
                toggleNameEdit(!editingName)
              }}
              onDoubleClick={(e) => {
                console.log('double click', e.detail)
                // e.stopPropagation()
                // history.push(`/regions/${subregion._id}`)
              }}
            >
              <a
                style={{ color: 'blue' }}
                onClick={() => history.push(`/regions/${subregion._id}`)}
              >
                {subregion.name}
              </a>
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
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '400',
              marginRight: '10%',
              marginLeft: '1%',
            }}
          >
            <div
              style={{ height: '100%', width: '100%' }}
              onClick={() => {
                toggleCapitalEdit(!editingCapital)
              }}
              // onDoubleClick={() => {
              //   props.history.push(`/regions/${subregion._id}`)
              // }}
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
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '400',
              marginRight: '10%',
              marginLeft: '1%',
            }}
          >
            <div
              style={{ height: '100%', width: '100%' }}
              onClick={(e) => {
                toggleLeaderEdit(!editingLeader)
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
        // onClick={() => {
        //   console.log(subregion._id)
        //   history.push(`/subregion/${entry}`)
        // }}
      >
        <div onClick={() => handlePushToLandmarks()}>
          {landmarksString === '' ? 'No Landmarks' : landmarksString}
        </div>
      </WCol>
      {showDelete && (
        <DeleteSubregion
          // fetchUser={props.fetchUser}
          setShowDelete={setShowDelete}
          activeRegion={props.activeRegion}
          subregionId={subregion._id}
          deleteSubregion={props.deleteSubregion}
          index={props.index}
          // regions={regions}
          // user={props.user}
          // refetchRegions={refetchRegions}
          // refetchRegionsRefetch={refetch}
        />
      )}
    </WRow>
  )
}

export default TableEntry
