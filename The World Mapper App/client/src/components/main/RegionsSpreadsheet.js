import TableHeader from './TableHeader'
import React, { useState } from 'react'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import Header from './Header'
import TableContents from './TableContents'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain'
import { EditRegion_Transaction } from '../../utils/jsTPS'
import * as mutations from '../../cache/mutations'

const RegionsSpreadsheet = (props) => {
  const auth = props.user === null ? false : true
  let params = useParams()
  const regionID = params.any

  const { loading, error, data, refetch } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: regionID },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })

  if (data) {
    const currentActiveRegion = data.getRegionById
    props.setActiveRegion(currentActiveRegion)
    console.log(props.activeRegion)
  }

  const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo())
  const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo())

  const keyCombination = (e, callback) => {
    if (e.key === 'z' && e.ctrlKey) {
      if (props.tps.hasTransactionToUndo()) {
        tpsUndo()
      }
    } else if (e.key === 'y' && e.ctrlKey) {
      if (props.tps.hasTransactionToRedo()) {
        tpsRedo()
      }
    }
  }
  document.onkeydown = keyCombination

  const tpsUndo = async () => {
    const ret = await props.tps.undoTransaction()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
    }
  }

  const tpsRedo = async () => {
    const ret = await props.tps.doTransaction()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
    }
  }

  const [UpdateSubregionField] = useMutation(mutations.UPDATE_SUBREGION_FIELD)

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

  const editSubregion = async (_id, field, value, prev) => {
    // let flag = 0
    // if (field === 'completed') flag = 1
    // let listID = activeList._id
    console.log(_id, field, value, prev)
    let transaction = new EditRegion_Transaction(
      // listID,
      _id,
      field,
      prev,
      value,
      UpdateSubregionField
    )
    props.tps.addTransaction(transaction)
    tpsRedo()
  }

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
              refetchRegions={refetch}
              undo={tpsUndo}
              redo={tpsRedo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
            <TableContents
              subregionIds={subregionIds}
              activeRegion={props.activeRegion}
              setActiveRegion={props.setActiveRegion}
              editSubregion={editSubregion}
            />
          </WMMain>
        </WLayout>
      ) : (
        history.push('/')
      )}
    </div>
  )
}

export default RegionsSpreadsheet
