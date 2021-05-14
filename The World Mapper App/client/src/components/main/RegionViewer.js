import React from 'react'
import Header from './Header'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_REGION_BY_ID } from '../../cache/queries'
import WLSide from 'wt-frontend/build/components/wlayout/WLSide'
import WLMain from 'wt-frontend/build/components/wlayout/WLMain'

const RegionViewer = (props) => {
  const auth = props.user === null ? false : true
  console.log(auth)
  let params = useParams()
  let history = useHistory()
  const regionID = params.any
  console.log(regionID)

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
    // console.log(parentRegionInfo.name)
  }

  let leftSibling = ''
  let rightSibling = ''

  // console.log(props.activeRegion.parentRegion)
  const grandParentRegion = useQuery(GET_REGION_BY_ID, {
    variables: { _id: props.activeRegion.parentRegion },
  })

  let grandParentRegionInfo = {}
  const siblings = []
  if (grandParentRegion.data) {
    grandParentRegionInfo = grandParentRegion.data.getRegionById
    for (let i = 0; i < grandParentRegionInfo.subregions.length; i++) {
      const element = grandParentRegionInfo.subregions[i]
      siblings.push(element)
    }
    // grandParentRegionInfo = currentActiveRegion
    // console.log(parentRegionInfo.name)
  }

  // console.log(siblings)

  // console.log(grandParentRegion.data.getRegionById)
  // const siblings = grandParentRegionInfo.subregions
  // console.log(siblings)
  let leftIndex = -1
  let rightIndex = -1
  for (let i = 0; i < siblings.length; i++) {
    // const previousElement = siblings[i - 1]
    // const previousElement = siblings[i - 1] ? siblings[i - 1] : ''
    // console.log(previousElement)
    // const nextElement = siblings[i + 1] ? siblings[i + 1] : ''
    const element = siblings[i]
    // console.log(element, regionID, i)
    if (element == regionID) {
      // props.setLeftSibling(siblings[i - 1])
      // props.setRightSibling(siblings[i + 1])
      leftSibling = siblings[i - 1]
      // console.log(i)
      rightSibling = siblings[i + 1]
    }
  }

  console.log(leftSibling)
  console.log(rightSibling)

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
                  }}
                >
                  Parent Region:
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
                    <WButton
                      wType='texted'
                      // className={`${buttonStyle}`}
                      style={{ padding: '0px', paddingLeft: '1%' }}
                      clickAnimation={props.disabled ? '' : 'ripple-light'}
                      //   onClick={() => setShowEdit()}
                    >
                      <i className='material-icons'>edit</i>
                    </WButton>
                  </div>
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
            <div
              style={{
                width: '50%',
                backgroundColor: 'black',
                margin: '5%',
                height: '100%',
              }}
            >
              <div>
                <h1 style={{ color: 'white' }}>Region Landmarks:</h1>
              </div>
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
