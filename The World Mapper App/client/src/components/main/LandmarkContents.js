import React from 'react'
import LandmarkEntry from './LandmarkEntry'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'

const LandmarkContents = (props) => {
  //   let entries = props.activeList ? props.activeList.items : null
  //   const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
  //     variables: { _id: props.activeRegion._id },
  //     refetchQueries: [{ query: GET_DB_REGIONS }],
  //   })
  const allRegions = useQuery(GET_DB_REGIONS)
  let entries = props.landmarks
  let entryCount = 0
  if (entries) {
    entries = entries.filter((entry) => entry !== null)
    entryCount = entries.length
  }

  const history = useHistory()

  return entries !== undefined && entries.length > 0 ? (
    <div
      className=' table-entries container-primary'
      style={{ padding: '0px' }}
    >
      {entries.map((entry, index) => (
        <LandmarkEntry
          entry={entry}
          key={entry}
          index={index}
          entryCount={entryCount}
          //   setActiveRegion={props.setActiveRegion}
          //   activeRegion={props.activeRegion}
          //   editSubregion={props.editSubregion}
          //   reorderItem={props.reorderItem}
          //   deleteSubregion={props.deleteSubregion}
          //   history={history}
        />
      ))}
    </div>
  ) : (
    <div className='container-primary'>
      {true ? <h2 className='nothing-msg'>No Landmarks added!</h2> : <></>}
    </div>
  )
}

export default LandmarkContents
