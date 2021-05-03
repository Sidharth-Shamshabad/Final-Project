import React, { useState } from 'react'
import Header from './Header'
import { useHistory } from 'react-router'
import { WLayout } from 'wt-frontend'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain'
import WLSide from 'wt-frontend/build/components/wlayout/WLSide'
import globe from './globe.jpeg'
import { useMutation, useQuery } from '@apollo/client'
import { GET_DB_REGIONS } from '../../cache/queries'
import * as mutations from '../../cache/mutations'
import CreateNewMapFile from '../modals/CreateNewMap'
import { WButton, WRow, WCol } from 'wt-frontend'
import DashboardItem from './DashboardItem'

const Dashboard = (props) => {
  const auth = props.user === null ? false : true
  const history = useHistory()
  const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo())
  const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo())
  // const [CreateMapFile] = useMutation(mutations.CREATE_MAP_FILE)
  const [showCreate, toggleShowCreate] = useState(false)

  const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS)
  let regions = []

  const refetchRegions = async (refetch) => {
    // const { loading, error, data } = await refetch()
    // if (data) {
    //   regions = data.getAllRegions
    // props.setActiveRegion((activeRegion) => {
    //   console.log(activeRegion)
    //   if (activeRegion._id) {
    //     let tempID = activeRegion._id
    //     let region = regions.find((list) => list._id === tempID)
    //     console.log(region)
    //     // setActiveList(list)
    //     return region
    //   }
    // })
    // console.log(data.getAllRegions)
    // }
  }

  console.log(data)
  if (loading) {
    console.log(loading, 'loading')
  }
  if (error) {
    console.log(error, 'error')
  }
  if (data) {
    // Assign todolists
    regions = []
    for (let region of data.getAllRegions) {
      console.log(data.getAllRegions)
      if (region.parentRegion === 'none') {
        regions.push(region)
      }
    }
    // if a list is selected, shift it to front of todolists
    if (props.activeRegion._id) {
      let selectedListIndex = regions.findIndex(
        (entry) => entry._id === props.activeRegion._id
      )
      let removed = regions.splice(selectedListIndex, 1)
      regions.unshift(removed[0])
    }
    // create data for sidebar links
    for (let region of regions) {
      if (region) {
        props.SidebarData.push({ _id: region._id, name: region.name })
      }
    }
    // props.fetchUser()
  }

  // const reloadRegion = async () => {
  //   if (props.activeRegion._id) {
  //     let tempID = props.activeRegion._id
  //     let region = props.regions.find((region) => region._id === tempID)
  //     props.setActiveRegion(region)
  //   }
  // }

  const loadRegion = (region) => {
    props.tps.clearAllTransactions()
    setCanUndo(props.tps.hasTransactionToUndo())
    setCanRedo(props.tps.hasTransactionToRedo())
    props.setActiveRegion(region)
  }

  const mutationOptions = {
    refetchQueries: [{ query: GET_DB_REGIONS }],
    awaitRefetchQueries: true,
    onCompleted: () => props.reloadRegion(),
  }

  const setShowCreate = () => {
    toggleShowCreate(!showCreate)
  }

  console.log(props.regions)
  console.log(props.regions)

  return (
    <WLayout wLayout='header-lside-rside'>
      <Header
        tps={props.tps}
        fetchUser={props.fetchUser}
        user={props.user}
        refreshTps={props.refreshTps}
        history={props.history}
        setActiveRegion={props.setActiveRegion}
      />
      <WLSide side='left'></WLSide>
      <WMMain>
        {auth === true ? (
          <div style={{ height: '100%' }}>
            <h1
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginBottom: '0px',
                textAlign: 'center',
                padding: '12.5px',
                height: '5.5%',
              }}
            >
              Your Maps
            </h1>
            <div
              className='map-select-body'
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'horizontal',
                height: '60%',
              }}
            >
              <div
                style={{
                  backgroundColor: 'pink',
                  width: '50%',
                  height: '100%',
                  fontWeight: 'bolder',
                  fontSize: '32px',
                  paddingLeft: '2.5%',
                  // paddingTop: '25px',
                  grid: 'fill',
                  overflow: 'scroll',
                  overflowX: 'hidden',
                  scrollbarWidth: 'thin',
                }}
              >
                {regions.map((region) => (
                  <DashboardItem
                    region={region}
                    user={props.user}
                    fetchUser={props.fetchUser}
                  />
                  // <div
                  //   style={{ display: 'flex', flexDirection: 'horizontal' }}
                  //   region={region}
                  // >
                  //   <div
                  //     style={{
                  //       paddingTop: '20px',
                  //       fontWeight: 'bolder',
                  //       width: '100%',
                  //     }}
                  //     onClick={(region) => {
                  //       console.log(region)
                  //       history.push('/regions')
                  //     }}
                  //     className='list-item'
                  //   >
                  //     {region.name}
                  //   </div>
                  //   <WButton
                  //     wType='texted'
                  //     // className={`${buttonStyle}`}
                  //     clickAnimation={props.disabled ? '' : 'ripple-light'}
                  //     onClick={(region) => console.log(region)}
                  //   >
                  //     <i className='material-icons'>delete_outline</i>
                  //   </WButton>
                  // </div>
                ))}
              </div>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  backgroundColor: 'darkgray',
                }}
              >
                <img
                  style={{ height: '85%', width: '100%' }}
                  src={globe}
                  alt=''
                  className='globe-home'
                />
                <button
                  style={{
                    height: '15%',
                    width: '100%',
                    backgroundColor: 'darkred',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '24px',
                  }}
                  onClick={setShowCreate}
                >
                  Create New Map
                </button>
              </div>
            </div>
          </div>
        ) : (
          history.push('/')
        )}
        {showCreate && (
          <CreateNewMapFile
            fetchUser={props.fetchUser}
            setShowCreate={setShowCreate}
            regions={regions}
            user={props.user}
            refetchRegions={refetchRegions}
            refetchRegionsRefetch={refetch}
          />
        )}
      </WMMain>
      <WLSide side='right'></WLSide>
    </WLayout>
  )
}

export default Dashboard
