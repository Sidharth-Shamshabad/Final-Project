import React, { useState } from 'react'
import Header from './Header'
import { WMMain, WLayout, WRow, WCol, WButton } from 'wt-frontend'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID } from '../../cache/queries'
import WLSide from 'wt-frontend/build/components/wlayout/WLSide'
import WLMain from 'wt-frontend/build/components/wlayout/WLMain'
import { GET_DB_REGIONS } from '../../cache/queries'
import LandmarkContents from './LandmarkContents'
import * as mutations from '../../cache/mutations'
import {
  UpdateLandmarks_Transaction,
  EditLandmark_Transaction,
} from '../../utils/jsTPS'

const RegionViewer = (props) => {
  const auth = props.user === null ? false : true
  console.log(auth)
  let params = useParams()
  let history = useHistory()
  const regionID = params.any
  console.log(regionID)

  const [editParentRegion, setEditParentRegion] = useState(false)
  const [AddLandmark] = useMutation(mutations.ADD_LANDMARK)
  const [RemoveLandmark] = useMutation(mutations.REMOVE_LANDMARK)
  const [EditLandmark] = useMutation(mutations.EDIT_LANDMARK)

  const currentRegion = useQuery(GET_REGION_BY_ID, {
    variables: { _id: regionID },
  })

  if (currentRegion.data) {
    const currentActiveRegion = currentRegion.data.getRegionById
    props.setActiveRegion(currentActiveRegion)
    // console.log(props.activeRegion)
  }

  const parentRegionId = props.activeRegion.parentRegion

  const parentRegion = useQuery(GET_REGION_BY_ID, {
    variables: { _id: parentRegionId },
  })

  let parentRegionInfo = {}

  if (parentRegion.data) {
    const currentActiveRegion = parentRegion.data.getRegionById
    parentRegionInfo = currentActiveRegion
  }

  const allRegions = useQuery(GET_DB_REGIONS)
  // const allRegionsData = allRegions.data.getAllRegions
  let rootRegions = []
  if (allRegions.data) {
    rootRegions = allRegions.data.getAllRegions
  }
  console.log(rootRegions)

  const handleChangeParent = async (e) => {
    const newParent = e.target.value ? e.target.value : parentRegionId
    const prevParent = parentRegionId
    for (let i = 0; i < rootRegions.length; i++) {
      const element = rootRegions[i]
      if (element.name === newParent) {
      }
    }
    setEditParentRegion(false)
  }
  const buttonStyle = props.disabled
    ? ' table-header-button-disabled '
    : 'table-header-button '

  const handleAddLandmark = async (e) => {
    const { loading, error, data, refetch } = await AddLandmark({
      variables: {
        _id: props.activeRegion._id,
        landmarkName: 'Untitled',
        index: -1,
      },
      refetchQueries: [{ query: GET_DB_REGIONS }],
    })
    props.fetchUser()
    // props.refetch()
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
    props.tps.addTransaction(transaction)
    // console.log(_id, field, value, prev)
    // tpsRedo()
  }

  const editLandmark = async (_id, value, prev, index) => {
    let transaction = new EditLandmark_Transaction(
      _id,
      value,
      prev,
      index,
      EditLandmark
    )
    props.tps.addTransaction(transaction)
    // console.log(_id, field, value, prev)
    // tpsRedo()
  }

  const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS)
  if (data) {
    // refetch()
  }

  return (
    <div>
      {auth === true ? (
        <WLayout>
          <Header
            tps={props.tps}
            fetchUser={props.fetchUser}
            user={props.user}
            refreshTps={props.refreshTps}
            history={props.history}
            activeRegion={props.activeRegion}
            setActiveRegion={props.setActiveRegion}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'horizontal',
              margin: '5%',
            }}
          >
            <div style={{ width: '50%' }}>
              <div style={{ width: '100%' }}>
                <h1>Flag</h1>
                <h2 style={{ color: 'white' }}>
                  Region Name: {props.activeRegion.name}
                </h2>
                <h2
                  style={{
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'horizontal',
                    width: '100%',
                  }}
                >
                  Parent Region:
                  {editParentRegion ? (
                    <select
                      className='table-select'
                      style={{ width: '30%' }}
                      onBlur={handleChangeParent}
                      autoFocus={true}
                      defaultValue={parentRegionInfo.name}
                    >
                      {rootRegions.map((x, y) => (
                        <option key={y}>{x.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div
                      style={{
                        color: 'lightblue',
                        paddingLeft: '1%',
                        display: 'flex',
                        flexDirection: 'horizontal',
                      }}
                      className='pointer'
                      onClick={() => {
                        history.push(`/regions/${parentRegionInfo._id}`)
                      }}
                    >
                      {parentRegionInfo.name}
                    </div>
                  )}
                  <WButton
                    wType='texted'
                    // className={`${buttonStyle}`}
                    style={{ padding: '0px', paddingLeft: '2%' }}
                    clickAnimation={props.disabled ? '' : 'ripple-light'}
                    onClick={() => setEditParentRegion(true)}
                  >
                    <i className='material-icons'>edit</i>
                  </WButton>
                </h2>
                <h2 style={{ color: 'white' }}>
                  Region Capital: {props.activeRegion.capital}
                </h2>
                <h2 style={{ color: 'white' }}>
                  Region Leader: {props.activeRegion.leader}
                </h2>
                <h2 style={{ color: 'white' }}>
                  Number of Subregions: {props.activeRegion.subregions.length}
                </h2>
              </div>
            </div>
            <div style={{ width: '50%' }}>
              <WLayout wLayout='header'>
                <div>
                  <h1 style={{ color: 'white' }}>Region Landmarks:</h1>
                </div>
                <WMMain
                  style={{
                    height: '80%',
                    backgroundColor: 'black',
                    height: '100%',
                    padding: '0px',
                  }}
                >
                  <LandmarkContents
                    landmarks={props.activeRegion.landmarks}
                    activeRegion={props.activeRegion}
                    refetchRegions={refetch}
                    editLandmark={editLandmark}
                    updateLandmarks={updateLandmarks}
                  />
                </WMMain>
              </WLayout>
              <WButton
                wType='texted'
                className={`${buttonStyle}`}
                clickAnimation={props.disabled ? '' : 'ripple-light'}
                style={{ color: 'green', padding: '0px', marginLeft: '0%' }}
                onClick={() => {
                  // handleAddLandmark()
                  updateLandmarks(props.activeRegion._id, 'Untitled', '', 1, -1)
                  refetch()
                }}
              >
                <i className='material-icons' fontSize='64px'>
                  add_box
                </i>
              </WButton>
            </div>
          </div>
        </WLayout>
      ) : (
        history.push('/')
        // console.log('auth not accepted')
      )}
    </div>
  )
}

export default RegionViewer
