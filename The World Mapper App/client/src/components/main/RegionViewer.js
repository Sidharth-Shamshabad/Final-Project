import React from 'react'
import Header from './Header'
import { WMMain, WLayout, WRow, WCol, WButton } from 'wt-frontend'
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
            <div style={{ width: '50%' }}>
              <WLayout wLayout='header'>
                <div>
                  <h1 style={{ color: 'white' }}>Region Landmarks:</h1>
                </div>
              </WLayout>
              <WMMain style={{ height: '80%' }}>
                <div
                // style={{
                //   width: '100%',
                //   backgroundColor: 'black',
                //   // margin: '5%',
                //   height: '100%',
                //   padding: '25%',
                // }}
                >
                  test
                </div>
              </WMMain>
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
