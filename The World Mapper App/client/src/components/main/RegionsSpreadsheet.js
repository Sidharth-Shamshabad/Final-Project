import TableHeader from './TableHeader'
import React, { useState, useEffect } from 'react'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import Header from './Header'
import TableContents from './TableContents'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain'
import {
  EditRegion_Transaction,
  DeleteSubregion_Transaction,
  UpdateRegions_Transaction,
} from '../../utils/jsTPS'
import * as mutations from '../../cache/mutations'

const RegionsSpreadsheet = (props) => {
  const auth = props.user === null ? false : true
  let params = useParams()
  const regionID = params.any
  // props.refetchRegions()

  const { loading, error, data, refetch } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: regionID },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })

  if (data) {
    const currentActiveRegion = data.getRegionById
    props.setActiveRegion(currentActiveRegion)
  }

  // useEffect(() => {
  //   if (data) {
  //     const currentActiveRegion = data.getRegionById
  //     props.setActiveRegion(currentActiveRegion)
  //   }
  // }, [data])

  let subregionIds = props.activeRegion.subregions
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
          <WMMain style={{ height: '80%' }}>
            <TableHeader
              activeRegion={props.activeRegion}
              regionName={props.activeRegion.name}
              parentRegionId={props.activeRegion._id}
              fetchUser={props.fetchUser}
              user={props.user}
              style={{ paddingBottom: '0px', marginBottom: '0px' }}
              refetchRegions={props.refetchRegions}
              undo={props.undo}
              redo={props.redo}
              canUndo={props.canUndo}
              canRedo={props.canRedo}
              tps={props.tps}
              // updateTransactionFlags={updateTransactionFlags}
              addSubregion={props.addSubregion}
            />
            <TableContents
              subregionIds={subregionIds}
              activeRegion={props.activeRegion}
              setActiveRegion={props.setActiveRegion}
              editSubregion={props.editSubregion}
              deleteSubregion={props.deleteSubregion}
              refetchRegions={props.refetchRegions}
              tps={props.tps}
            />
          </WMMain>
        </WLayout>
      ) : (
        history.push('/')
        // console.log('pls work')
      )}
    </div>
  )
}

export default RegionsSpreadsheet
