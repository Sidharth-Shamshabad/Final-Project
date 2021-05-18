import React, { useState } from 'react'
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
import Main from './components/main/Main'

const App = () => {
  let user = null
  let transactionStack = new jsTPS()
  const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER)

  if (error) {
    console.log(error)
  }
  if (loading) {
    console.log(loading)
  }
  if (data) {
    let { getCurrentUser } = data
    if (getCurrentUser !== null) {
      user = getCurrentUser
    }
  }

  return <Main tps={transactionStack} fetchUser={refetch} user={user} />
}

export default App
