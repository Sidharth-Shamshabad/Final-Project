import React from 'react'
import Header from './Header'

const Dashboard = (props) => {
  return (
    <div className='dashboard'>
      <Header
        tps={props.tps}
        fetchUser={props.fetchUser}
        user={props.user}
        refreshTps={props.refreshTps}
        history={props.history}
      />
    </div>
  )
}

export default Dashboard
