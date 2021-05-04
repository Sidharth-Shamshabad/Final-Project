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
  console.log(subregion)

  // console.log(subregion)

  // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task'
  // const assignedToStyle = data.completed
  //   ? 'complete-task-assignedTo'
  //   : 'incomplete-task-assignedTo'

  // const description = data.description
  // const due_date = data.due_date
  // const status = data.completed ? 'complete' : 'incomplete'
  // const assigned_to = data.assigned_to

  // const canMoveUp = props.index > 0 ? true : false
  // const canMoveDown = props.index < props.entryCount - 1 ? true : false

  // const [editingDate, toggleDateEdit] = useState(false)
  // const [editingDescr, toggleDescrEdit] = useState(false)
  // const [editingStatus, toggleStatusEdit] = useState(false)
  // const [editingAssigned, toggleAssignEdit] = useState(false)

  // const disabledButton = () => {}

  // const handleDateEdit = (e) => {
  //   toggleDateEdit(false)
  //   const newDate = e.target.value ? e.target.value : 'No Date'
  //   const prevDate = due_date
  //   if (newDate !== prevDate) {
  //     //   props.editItem(data._id, 'due_date', newDate, prevDate);
  //   }
  // }

  // const handleDescrEdit = (e) => {
  //   toggleDescrEdit(false)
  //   const newDescr = e.target.value ? e.target.value : 'No Description'
  //   const prevDescr = description
  //   if (newDescr !== prevDescr) {
  //     //   props.editItem(data._id, 'description', newDescr, prevDescr);
  //   }
  // }

  // const handleStatusEdit = (e) => {
  //   toggleStatusEdit(false)
  //   const newStatus = e.target.value ? e.target.value : false
  //   const prevStatus = status
  //   if (newStatus !== prevStatus) {
  //     //   props.editItem(data._id, 'completed', newStatus, prevStatus);
  //   }
  // }

  // const handleAssignEdit = (e) => {
  //   toggleAssignEdit(false)
  //   const newAssigned = e.target.value ? e.target.value : 'Myself'
  //   const prevAssigned = assigned_to
  //   if (newAssigned !== prevAssigned) {
  //     //   props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
  //   }
  // }

  // console.log('table entry data', data)
  let history = useHistory()

  return (
    <WRow className='table-entry' style={{ backgroundColor: 'gray' }}>
      <WCol
        size='3'
        className='pointer'
        onClick={() => {
          history.push(`/regions/${subregion._id}`)
        }}
      >
        <WButton
          wType='texted'
          className='table-header-button'
          clickAnimation={props.disabled ? '' : 'ripple-light'}
          style={{ color: 'black', marginLeft: '0px' }}
        >
          <i className='material-icons'>delete_outline</i>
        </WButton>
        {subregion.name}
      </WCol>

      <WCol size='2'>{subregion.capital}</WCol>

      <WCol size='2'>{subregion.leader}</WCol>

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
