import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import {
  GET_REGION_BY_ID,
  GET_DB_REGIONS,
  GET_REGION_PATH,
} from '../../cache/queries'
import { useHistory } from 'react-router'
import DeleteSubregion from '../modals/DeleteSubregion'

const TableEntry = (props) => {
  const { entry } = props

  const { loading, error, data, refetch } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: entry },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })
  let subregion = {}
  if (data) {
    subregion = data.getRegionById
  }

  const regionPath = useQuery(GET_REGION_PATH, {
    variables: { _id: subregion._id },
  })
  let regionPaths = []
  if (regionPath.data) {
    regionPaths = regionPath.data.getRegionPath
  }

  let pathString = '/The World'

  for (let i = 0; i < regionPaths.length; i++) {
    const element = regionPaths[i]
    pathString += '/' + element.name
    if (i == regionPaths.length - 1) {
      pathString += ' Flag.png'
    }
  }
  console.log(pathString)

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

  const handleNameEdit = async (e) => {
    e.stopPropagation()
    toggleNameEdit(false)
    const newName = e.target.value ? e.target.value : 'Untitled'
    const prevName = name
    if (newName !== prevName) {
      await props.editSubregion(subregion._id, 'name', newName, prevName)
      await props.refetchRegions()
      await refetch()
    }
  }

  const handleCapitalEdit = async (e) => {
    e.stopPropagation()
    toggleCapitalEdit(false)
    const newCapital = e.target.value ? e.target.value : 'Untitled'
    const prevCapital = capital
    if (newCapital !== prevCapital) {
      await props.editSubregion(
        subregion._id,
        'capital',
        newCapital,
        prevCapital
      )
      await props.refetchRegions()
      await refetch()
    }
  }

  const handleLeaderEdit = async (e) => {
    e.stopPropagation()
    toggleLeaderEdit(false)
    const newLeader = e.target.value ? e.target.value : 'Untitled'
    const prevLeader = leader
    if (newLeader !== prevLeader) {
      await props.editSubregion(subregion._id, 'leader', newLeader, prevLeader)
      await props.refetchRegions()
      await refetch()
    }
  }

  const handlePushToLandmarks = (e) => {
    history.push(`/subregion/${entry}`)
  }

  const location = `/subregion/${entry}`

  let history = useHistory()

  let landmarksArr = subregion.landmarks ? subregion.landmarks : []
  let landmarksString = ''
  for (let i = 0; i < landmarksArr.length; i++) {
    landmarksString += landmarksArr[i]
    if (i !== landmarksArr.length - 1) {
      landmarksString += ', '
    }
  }
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
                onClick={() => {
                  history.push(`/regions/${subregion._id}`)
                  props.tps.clearAllTransactions()
                }}
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

      <WCol size='2'>
        {
          <img
            style={{ width: '25%', height: '25%', alignItems: 'center' }}
            src={pathString}
          ></img>
        }
      </WCol>
      <WCol
        size='3'
        className='pointer'
        // onClick={() => {
        //   console.log(subregion._id)
        //   history.push(`/subregion/${entry}`)
        // }}
      >
        <div
          onClick={() => {
            handlePushToLandmarks()
            props.tps.clearAllTransactions()
          }}
        >
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
