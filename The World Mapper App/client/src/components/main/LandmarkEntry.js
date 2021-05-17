import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'
import DeleteSubregion from '../modals/DeleteSubregion'

const LandmarkEntry = (props) => {
  const { entry } = props
  // const [landmarks, setLandmarks] = useState('No Landmarks')
  // console.log(entry)

  //   const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
  //     variables: { _id: entry },
  //     refetchQueries: [{ query: GET_DB_REGIONS }],
  //   })
  //   let subregion = {}
  //   if (data) {
  //     subregion = data.getRegionById
  //   }

  //   const name = subregion.name
  //   const capital = subregion.capital
  //   const leader = subregion.leader
  //   const subregionRedirectID = subregion._id

  //   const [editingName, toggleNameEdit] = useState(false)
  //   const [editingCapital, toggleCapitalEdit] = useState(false)
  //   const [editingLeader, toggleLeaderEdit] = useState(false)
  //   const [showDelete, toggleShowDelete] = useState(false)

  //   const setShowDelete = () => {
  //     toggleShowDelete(!showDelete)
  //   }

  // const disabledButton = () => {}

  //   const handleGoToSubregion = (e) => {}

  //   const handleNameEdit = (e) => {
  //     e.stopPropagation()
  //     toggleNameEdit(false)
  //     const newName = e.target.value ? e.target.value : 'Untitled'
  //     const prevName = name
  //     if (newName !== prevName) {
  //       props.editSubregion(subregion._id, 'name', newName, prevName)
  //     }
  //   }

  //   const handleCapitalEdit = (e) => {
  //     e.stopPropagation()
  //     toggleCapitalEdit(false)
  //     const newCapital = e.target.value ? e.target.value : 'Untitled'
  //     const prevCapital = capital
  //     if (newCapital !== prevCapital) {
  //       props.editSubregion(subregion._id, 'capital', newCapital, prevCapital)
  //     }
  //   }

  //   const handleLeaderEdit = (e) => {
  //     e.stopPropagation()
  //     toggleLeaderEdit(false)
  //     const newLeader = e.target.value ? e.target.value : 'Untitled'
  //     const prevLeader = leader
  //     if (newLeader !== prevLeader) {
  //       props.editSubregion(subregion._id, 'leader', newLeader, prevLeader)
  //     }
  //   }

  //   const handlePushToLandmarks = (e) => {
  //     console.log(entry)
  //     history.push(`/subregion/${entry}`)
  //   }

  const location = `/subregion/${entry}`

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
            //   onClick={setShowDelete}
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
              // toggleNameEdit(!editingName)
            }}
          >
            {entry}
          </div>
        </div>
      </WCol>
    </WRow>
  )
}

export default LandmarkEntry
