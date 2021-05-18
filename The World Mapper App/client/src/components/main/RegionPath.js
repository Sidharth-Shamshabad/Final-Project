import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'
import DeleteSubregion from '../modals/DeleteSubregion'
import TableEntry from './TableEntry'

const LandmarkEntry = (props) => {
  const { entry } = props

  let history = useHistory()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'horizontal',
        fontWeight: 'bolder',
      }}
    >
      <div
        onClick={() => {
          history.push(`/regions/${entry._id}`)
          props.tps.clearAllTransactions()
        }}
        className='pointer'
        style={{
          display: 'flex',
          flexDirection: 'horizontal',
          fontWeight: 'bolder',
          fontSize: '24px',
          width: '100%',
        }}
      >
        {entry.name}
        {props.index === props.regionPaths.length - 1 ? (
          <div></div>
        ) : (
          <div>></div>
        )}
      </div>
    </div>
  )
}

export default LandmarkEntry
