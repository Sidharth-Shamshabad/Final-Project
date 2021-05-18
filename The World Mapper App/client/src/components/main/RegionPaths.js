import React from 'react'
import TableEntry from './TableEntry'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import { useHistory } from 'react-router'
import RegionPath from './RegionPath'

const RegionPaths = (props) => {
  //   let entries = props.activeList ? props.activeList.items : null
  //   const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
  //     variables: { _id: props.activeRegion._id },
  //     refetchQueries: [{ query: GET_DB_REGIONS }],
  //   })
  let entries = props.regionPaths
  let entryCount = 0
  if (entries) {
    entries = entries.filter((entry) => entry !== null)
    entryCount = entries.length
  }

  const history = useHistory()
  // const [editingName, toggleNameEdit] = useState(false)

  return entries !== undefined && entries.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'horizontal' }}>
      {entries.map((entry, index) => (
        <RegionPath
          style={{ display: 'flex', flexDirection: 'horizontal' }}
          entry={entry}
          key={entry}
          index={index}
          entryCount={entryCount}
          regionPaths={props.regionPaths}
          tps={props.tps}
        />
      ))}
    </div>
  ) : (
    <div className='container-primary'>
      {
        /*props.activeList._id*/ true ? (
          <h2 className='nothing-msg'></h2>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default RegionPaths
