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

  const { loading, error, data, refetch } = useQuery(GET_REGION_BY_ID, {
    variables: { _id: regionID },
    refetchQueries: [{ query: GET_DB_REGIONS }],
  })

  useEffect(() => {
    if (data) {
      const currentActiveRegion = data.getRegionById
      props.setActiveRegion(currentActiveRegion)
    }
  }, [data])

  const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo())
  const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo())
  const [hasUndo, setHasUndo] = useState(false)
  const [hasRedo, setHasRedo] = useState(false)

  // useEffect(() => {
  //   document.addEventListener('keydown', keyCombination)
  //   return () => {
  //     document.removeEventListener('keydown', keyCombination)
  //   }
  // }, [props.tps])

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
    // updateTransactionFlags()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      console.log(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
      console.log(props.tps.hasTransactionToRedo())
    }
  }

  const tpsRedo = async () => {
    const ret = await props.tps.doTransaction()
    console.log(ret)
    // updateTransactionFlags()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      console.log(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
      console.log(props.tps.hasTransactionToRedo())
    }
  }

  const updateTransactionFlags = async () => {
    if (props.tps.getUndoSize() > 0) {
      setHasUndo(true)
    } else {
      setHasUndo(false)
    }

    if (props.tps.getRedoSize()) {
      setHasRedo(true)
    } else {
      setHasRedo(false)
    }
  }

  const [UpdateSubregionField] = useMutation(mutations.UPDATE_SUBREGION_FIELD)
  const [AddSubregion] = useMutation(mutations.ADD_SUBREGION)
  const [RemoveSubregion] = useMutation(mutations.REMOVE_SUBREGION)
  const [ReaddSubregion] = useMutation(mutations.READD_SUBREGION)

  let subregionIds = props.activeRegion.subregions
  let history = useHistory()

  const editSubregion = async (_id, field, value, prev) => {
    let transaction = new EditRegion_Transaction(
      _id,
      field,
      prev,
      value,
      UpdateSubregionField
    )
    props.tps.addTransaction(transaction)
    console.log(_id, field, value, prev)
    // tpsRedo()
  }

  const deleteSubregion = async (_id, region, subregionId, field, index) => {
    let updatedSubregions = region.subregions
    // let transaction = new DeleteSubregion_Transaction(
    //   _id,
    //   subregionId,
    //   updatedSubregions,
    //   RemoveSubregion,
    //   ReaddSubregion
    // )
    let opcode = 0
    let transaction = new UpdateRegions_Transaction(
      _id,
      subregionId,
      region,
      opcode,
      AddSubregion,
      RemoveSubregion,
      index
    )
    props.tps.addTransaction(transaction)
    // props.redo()
    props.fetchUser()
    refetch()
    // props.tps.addTransaction(transaction)
    tpsRedo()
  }
  console.log(auth)
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
              tps={props.tps}
              updateTransactionFlags={updateTransactionFlags}
              hasUndo={hasUndo}
              hasRedo={hasRedo}
            />
            <TableContents
              subregionIds={subregionIds}
              activeRegion={props.activeRegion}
              setActiveRegion={props.setActiveRegion}
              editSubregion={editSubregion}
              deleteSubregion={deleteSubregion}
            />
          </WMMain>
        </WLayout>
      ) : (
        // history.push('/')
        console.log('pls work')
      )}
    </div>
  )
}

export default RegionsSpreadsheet
