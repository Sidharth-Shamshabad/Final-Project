import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'
import DeleteSubregion from '../modals/DeleteSubregion'
import TableEntry from './TableEntry'

const LandmarkEntry = (props) => {
  const { entry } = props
  // const [landmarks, setLandmarks] = useState('No Landmarks')
  // console.log(entry)

  // const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
  //   variables: { _id: entry },
  //   refetchQueries: [{ query: GET_DB_REGIONS }],
  // })
  // let subregion = {}
  // if (data) {
  //   subregion = data.getRegionById
  // }

  //   const name = subregion.name
  //   const capital = subregion.capital
  //   const leader = subregion.leader
  //   const subregionRedirectID = subregion._id

  const [editingName, toggleNameEdit] = useState(false)
  //   const [editingCapital, toggleCapitalEdit] = useState(false)
  //   const [editingLeader, toggleLeaderEdit] = useState(false)
  //   const [showDelete, toggleShowDelete] = useState(false)

  //   const setShowDelete = () => {
  //     toggleShowDelete(!showDelete)
  //   }

  // const disabledButton = () => {}

  //   const handleGoToSubregion = (e) => {}
  let currentActiveRegion = props.activeRegion

  const handleNameEdit = (e) => {
    e.stopPropagation()
    toggleNameEdit(false)
    const newName = e.target.value ? e.target.value : 'Untitled'
    const prevName = entry
    if (newName !== prevName) {
      props.editLandmark(
        currentActiveRegion._id,
        newName,
        prevName,
        props.index
      )
    }
  }

  let history = useHistory()

  return (
    <WRow
      className='table-entry'
      style={{ alignItems: 'center', backgroundColor: 'black' }}
    >
      <WCol
        size='3'
        className='pointer'
        // onClick={() => {
        //   history.push(`/regions/${subregion._id}`)
        // }}
      >
        {editingName || entry === '' ? (
          <WInput
            className='table-input'
            onBlur={handleNameEdit}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleNameEdit(e)
            }}
            autoFocus={true}
            defaultValue={entry}
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
              onClick={() => {
                props.updateLandmarks(
                  props.activeRegion._id,
                  '',
                  entry,
                  0,
                  props.index
                )
              }}
            >
              <i className='material-icons'>delete_outline</i>
            </WButton>
            <div
              //   style={{
              //     height: '100%',
              //     width: '100%',
              //     alignItems: 'center',
              //     backgroundColor: 'white',
              //     marginRight: '10%',
              //     marginLeft: '1%',
              //   }}
              onClick={(e) => {
                console.log('single click', e.detail)
                // e.stopPropagation()
                toggleNameEdit(!editingName)
              }}
            >
              {entry}
            </div>
          </div>
        )}
      </WCol>
    </WRow>
  )
}

export default LandmarkEntry
