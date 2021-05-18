import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Dashboard from './Dashboard'
import RegionsSpreadsheet from './RegionsSpreadsheet'
import RegionViewer from './RegionViewer'
import Homescreen from '../homescreen/Homescreen'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom'
import * as mutations from '../../cache/mutations'
import {
  EditRegion_Transaction,
  DeleteSubregion_Transaction,
  UpdateRegions_Transaction,
  UpdateLandmarks_Transaction,
  EditLandmark_Transaction,
} from '../../utils/jsTPS'
import { GET_REGION_BY_ID, GET_DB_REGIONS } from '../../cache/queries'

const Main = (props) => {
  let regions = []
  let SidebarData = []
  const [activeRegion, setActiveRegion] = useState({})
  let refreshTps = false
  let history = useHistory()

  const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS)

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

  const refetchTheRegions = async (refetch) => {
    const { loading, error, data } = await refetch()
    // if (data) {
    //   regions = data.getAllTodos
    //   setActiveList((activeList) => {
    //     console.log(activeList)
    //     if (activeList._id) {
    //       let tempID = activeList._id
    //       let list = todolists.find((list) => list._id === tempID)
    //       console.log(list)
    //       // setActiveList(list)
    //       return list
    //     }
    //   })
    //   console.log(data.getAllTodos)
    // }
  }

  const tpsUndo = async () => {
    const ret = await props.tps.undoTransaction()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
    }
    refetch()
    await props.fetchUser()
  }

  const tpsRedo = async () => {
    const ret = await props.tps.doTransaction()
    console.log(ret)
    setCanUndo(props.tps.getUndoSize() > 0)
    setCanRedo(props.tps.getRedoSize() > 0)
    if (ret) {
      console.log('TESTING NOT WORKING')
      setCanUndo(props.tps.getUndoSize() > 0)
      setCanRedo(props.tps.getRedoSize() > 0)
    }
    refetch()
    await props.fetchUser()
    console.log(canUndo, canRedo)
  }

  const [UpdateSubregionField] = useMutation(mutations.UPDATE_SUBREGION_FIELD)
  const [AddSubregion] = useMutation(mutations.ADD_SUBREGION)
  const [RemoveSubregion] = useMutation(mutations.REMOVE_SUBREGION)
  const [ReaddSubregion] = useMutation(mutations.READD_SUBREGION)
  const [AddLandmark] = useMutation(mutations.ADD_LANDMARK)
  const [RemoveLandmark] = useMutation(mutations.REMOVE_LANDMARK)
  const [EditLandmark] = useMutation(mutations.EDIT_LANDMARK)

  let subregionIds = activeRegion.subregions

  const editSubregion = async (_id, field, value, prev) => {
    let transaction = new EditRegion_Transaction(
      _id,
      field,
      prev,
      value,
      UpdateSubregionField
    )
    await props.tps.addTransaction(transaction)
    await tpsRedo()
    refetch()
    props.fetchUser()
  }

  const AddNewSubregion = async (parentRegionId) => {
    const length = activeRegion.length
    const id =
      length >= 1
        ? regions[length - 1].id + Math.floor(Math.random() * 100 + 1)
        : 1

    let region = {
      _id: '',
      id: id,
      name: 'Untitled',
      owner: props.user._id,
      parentRegion: parentRegionId,
      subregions: [],
      capital: 'Untitled',
      leader: 'Untitled',
      flag: 'Untitled',
      landmarks: [],
      sortRule: 'name',
      sortDirection: 1,
    }
    let opcode = 1
    let transaction = new UpdateRegions_Transaction(
      parentRegionId,
      '',
      region,
      opcode,
      AddSubregion,
      RemoveSubregion,
      ReaddSubregion
    )
    await props.tps.addTransaction(transaction)
    await tpsRedo()
    refetch()
    props.fetchUser()
  }

  const deleteSubregion = async (_id, region, subregionId, field, index) => {
    let updatedSubregions = region.subregions
    let opcode = 0
    let transaction = new UpdateRegions_Transaction(
      _id,
      subregionId,
      region,
      opcode,
      AddSubregion,
      RemoveSubregion,
      ReaddSubregion,
      index
    )
    await props.tps.addTransaction(transaction)
    await tpsRedo()
    refetch()
    props.fetchUser()
  }

  const updateLandmarks = async (_id, value, prev, opcode, index) => {
    let transaction = new UpdateLandmarks_Transaction(
      _id,
      value,
      prev,
      AddLandmark,
      RemoveLandmark,
      opcode,
      index
    )
    await props.tps.addTransaction(transaction)
    await tpsRedo()
    refetch()
    props.fetchUser()
  }

  const editLandmark = async (_id, value, prev, index) => {
    let transaction = new EditLandmark_Transaction(
      _id,
      value,
      prev,
      index,
      EditLandmark
    )
    await props.tps.addTransaction(transaction)
    await tpsRedo()
    refetch()
    props.fetchUser()
  }

  console.log(props.tps.getRedoSize())
  console.log(props.tps.getUndoSize())

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route
          path='/'
          exact={true}
          name='welcome'
          render={() => (
            <Homescreen
              tps={props.tps}
              fetchUser={props.fetchUser}
              user={props.user}
              refreshTps={refreshTps}
              history={history}
              setActiveRegion={setActiveRegion}
            />
          )}
        />
        <Route
          path='/home'
          name='home'
          render={() => (
            <Dashboard
              tps={props.tps}
              fetchUser={props.fetchUser}
              user={props.user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
            />
          )}
        />
        <Route
          path='/regions/:any'
          name='regions'
          render={() => (
            <RegionsSpreadsheet
              tps={props.tps}
              fetchUser={props.fetchUser}
              user={props.user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
              editSubregion={editSubregion}
              addSubregion={AddNewSubregion}
              deleteSubregion={deleteSubregion}
              canUndo={canUndo}
              canRedo={canRedo}
              undo={tpsUndo}
              redo={tpsRedo}
              refetchRegions={refetch}
            />
          )}
        />
        <Route
          path='/subregion/:any'
          exact={true}
          name='subregion'
          render={() => (
            <RegionViewer
              tps={props.tps}
              fetchUser={props.fetchUser}
              user={props.user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
              refetchRegions={refetch}
              canUndo={canUndo}
              canRedo={canRedo}
              undo={tpsUndo}
              redo={tpsRedo}
              refetchRegions={refetch}
              updateLandmarks={updateLandmarks}
              editLandmark={editLandmark}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Main
