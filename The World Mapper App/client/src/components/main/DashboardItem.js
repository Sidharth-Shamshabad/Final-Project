import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { WButton, WRow, WCol } from 'wt-frontend'
import Delete from '../modals/Delete'

const DashboardItem = (props) => {
  let history = useHistory()
  const [showDelete, toggleShowDelete] = useState(false)

  const setShowDelete = () => {
    toggleShowDelete(!showDelete)
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
        onClick={(region) => {
          console.log(region)
          history.push('/regions')
        }}
        className='list-item'
      >
        {props.region.name}
      </div>
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
    </div>
  )
}

export default DashboardItem
