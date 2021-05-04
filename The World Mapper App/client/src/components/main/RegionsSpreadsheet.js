import TableHeader from './TableHeader'
import React from 'react'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import Header from './Header'
import TableContents from './TableContents'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID } from '../../cache/queries'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain'

const RegionsSpreadsheet = (props) => {
  const auth = props.user === null ? false : true
  let params = useParams()
  const regionID = params.any

  const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: regionID },
  })

  if (data) {
    const currentActiveRegion = data.getRegionById
    props.setActiveRegion(currentActiveRegion)
    console.log(props.activeRegion)
  }

  // let subregions = []
  let subregionIds = props.activeRegion.subregions
  console.log(subregionIds)
  // for (let i = 0; i < subregionIds.length; i++) {
  //   const element = subregionIds[i]
  //   const { loading, error, data } = useQuery(GET_REGION_BY_ID, {
  //     variables: { _id: element },
  //   })

  //   if (data) {
  //     subregions.push(data.getRegionById)
  //   }
  // }
  let history = useHistory()

  return (
    <div>
      {auth === true ? (
        <WLayout wLayout='header'>
          <Header
            tps={props.tps}
            fetchUser={props.fetchUser}
            user={props.user}
            refreshTps={props.refreshTps}
            history={props.history}
            setActiveRegion={props.setActiveRegion}
          />
          <WMMain>
            <TableHeader
              activeRegion={props.activeRegion}
              regionName={props.activeRegion.name}
              parentRegionId={props.activeRegion._id}
              fetchUser={props.fetchUser}
              user={props.user}
              style={{ paddingBottom: '0px', marginBottom: '0px' }}
            />
            <TableContents subregionIds={subregionIds} />
          </WMMain>
        </WLayout>
      ) : (
        history.push('/')
      )}
    </div>
  )
}

export default RegionsSpreadsheet
