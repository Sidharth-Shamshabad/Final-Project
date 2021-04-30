import React from 'react'
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

const App = () => {
  let user = null
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
    }
  }
  let history = useHistory()
  console.log(history)
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
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
