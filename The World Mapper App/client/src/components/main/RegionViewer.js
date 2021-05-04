import React from 'react'
import Header from './Header'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'

const RegionViewer = (props) => {
  const auth = props.user === null ? false : true
  console.log(auth)
  let params = useParams()
  let history = useHistory()
  const regionID = params.any
  return (
    <div>
      {auth === true ? (
        <WLayout wLayout='header-lside'>
          <Header
            tps={props.tps}
            fetchUser={props.fetchUser}
            user={props.user}
            refreshTps={props.refreshTps}
            history={props.history}
            setActiveRegion={props.setActiveRegion}
          />
        </WLayout>
      ) : (
        history.push('/')
      )}
    </div>
  )
}

export default RegionViewer
