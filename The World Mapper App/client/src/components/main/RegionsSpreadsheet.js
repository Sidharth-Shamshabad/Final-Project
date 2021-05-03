import TableHeader from './TableHeader'
import React from 'react'
import { WLayout, WRow, WCol, WButton } from 'wt-frontend'
import Header from './Header'
import TableContents from './TableContents'

const RegionsSpreadsheet = (props) => {
  const auth = props.user === null ? false : true

  return (
    <WLayout wLayout='header'>
      <Header
        tps={props.tps}
        fetchUser={props.fetchUser}
        user={props.user}
        refreshTps={props.refreshTps}
        history={props.history}
        setActiveRegion={props.setActiveRegion}
      />
      <TableHeader />
      <TableContents />
    </WLayout>
  )
}

export default RegionsSpreadsheet
