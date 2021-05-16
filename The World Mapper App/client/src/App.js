import React, { useState } from 'react'
import Homescreen from './components/homescreen/Homescreen'
import { useQuery } from '@apollo/client'
import * as queries from './cache/queries'
import { jsTPS } from './utils/jsTPS'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom'
import Dashboard from './components/main/Dashboard'
import RegionsSpreadsheet from './components/main/RegionsSpreadsheet'
import RegionViewer from './components/main/RegionViewer'

// const getUserInfo = () => {
//   const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER)
//   const userLoading = loading
//   const userError = error
//   const userData = data
//   const userRefetch = refetch
//   return { userLoading, userError, userData, userRefetch }
// }

const App = () => {
  let history = useHistory()
  console.log(history)

  let regions = []
  let SidebarData = []
  const [activeRegion, setActiveRegion] = useState({})

  const reloadRegion = async () => {
    if (activeRegion._id) {
      let tempID = activeRegion._id
      let region = regions.find((region) => region._id === tempID)
      setActiveRegion(region)
    }
  }

  let user = null
  // useEffect(() => {
  // }, [input])
  let transactionStack = new jsTPS()
  let refreshTps = false
  const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER)
  console.log('USER DATA', data)

  if (error) {
    console.log(error)
  }
  if (loading) {
    console.log(loading)
  }
  if (data) {
    // console.log(history)
    let { getCurrentUser } = data
    if (getCurrentUser !== null) {
      user = getCurrentUser
      // refetch()
    }
  }

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route
          path='/'
          exact={true}
          name='welcome'
          render={() => (
            <Homescreen
              tps={transactionStack}
              fetchUser={refetch}
              user={user}
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
              tps={transactionStack}
              fetchUser={refetch}
              user={user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
              reloadRegion={reloadRegion}
            />
          )}
        />
        <Route
          path='/regions/:any'
          name='regions'
          render={() => (
            <RegionsSpreadsheet
              tps={transactionStack}
              fetchUser={refetch}
              user={user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
              reloadRegion={reloadRegion}
            />
          )}
        />
        <Route
          path='/subregion/:any'
          exact={true}
          name='subregion'
          render={() => (
            <RegionViewer
              tps={transactionStack}
              fetchUser={refetch}
              user={user}
              refreshTps={refreshTps}
              history={history}
              regions={regions}
              SidebarData={SidebarData}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
              reloadRegion={reloadRegion}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
