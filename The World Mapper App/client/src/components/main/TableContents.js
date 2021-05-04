import React from 'react'
import TableEntry from './TableEntry'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'

const TableContents = (props) => {
  //   let entries = props.activeList ? props.activeList.items : null
  const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: props.activeRegion._id },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })
  let entries = props.subregionIds
  let entryCount = 0
  if (entries) {
    entries = entries.filter((entry) => entry !== null)
    entryCount = entries.length
  }

  console.log(entryCount)

  return entries !== undefined && entries.length > 0 ? (
    <div className=' table-entries container-primary'>
      {entries.map((entry, index) => (
        <TableEntry
          entry={entry}
          key={entry}
          index={index}
          entryCount={entryCount}
          //   deleteItem={props.deleteItem}
          //   reorderItem={props.reorderItem}
          //   editItem={props.editItem}
        />
      ))}
    </div>
  ) : (
    <div className='container-primary'>
      {
        /*props.activeList._id*/ true ? (
          <h2 className='nothing-msg'>No Subregions added!</h2>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default TableContents
