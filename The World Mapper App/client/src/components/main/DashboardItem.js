import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { WButton, WRow, WCol } from 'wt-frontend'
import Delete from '../modals/Delete'
import EditMapName from '../modals/EditMapName'

const DashboardItem = (props) => {
  let history = useHistory()
  const [showDelete, toggleShowDelete] = useState(false)
  const [showEdit, toggleShowEdit] = useState(false)

  const setShowDelete = () => {
    toggleShowEdit(false)
    toggleShowDelete(!showDelete)
  }

  const setShowEdit = () => {
    toggleShowDelete(false)
    toggleShowEdit(!showEdit)
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'horizontal' }}
      //   region={region}
    >
      <div
        style={{
          paddingTop: '20px',
          fontWeight: 'bolder',
          width: '100%',
        }}
        onClick={() => {
          props.setActiveRegion(props.region)
          props.fetchUser()
          console.log('Current Active Region >>>', props.activeRegion)
          history.push(`/regions/${props.region._id}`)
        }}
        className='list-item'
      >
        {props.region.name}
      </div>
      <WButton
        wType='texted'
        // className={`${buttonStyle}`}
        clickAnimation={props.disabled ? '' : 'ripple-light'}
        onClick={() => setShowEdit()}
      >
        <i className='material-icons'>edit</i>
      </WButton>
      <WButton
        wType='texted'
        // className={`${buttonStyle}`}
        clickAnimation={props.disabled ? '' : 'ripple-light'}
        onClick={() => setShowDelete()}
      >
        <i className='material-icons'>delete_outline</i>
      </WButton>
      {showDelete && (
        <Delete
          //   deleteList={deleteList}
          activeid={props.region._id}
          setShowDelete={setShowDelete}
        />
      )}
      {showEdit && (
        <EditMapName
          setShowEdit={setShowEdit}
          fetchUser={props.fetchUser}
          user={props.user}
          region={props.region}
        />
      )}
    </div>
  )
}

export default DashboardItem
