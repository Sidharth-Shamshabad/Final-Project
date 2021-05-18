import Logo from '../navbar/Logo'
import Login from '../modals/Login'
import Delete from '../modals/Delete'
import MainContents from '../main/MainContents'
import CreateAccount from '../modals/CreateAccount'
import NavbarOptions from '../navbar/NavbarOptions'
import * as mutations from '../../cache/mutations'
import SidebarContents from '../sidebar/SidebarContents'
import { GET_DB_TODOS } from '../../cache/queries'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { WNavbar, WSidebar, WNavItem } from 'wt-frontend'
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend'
import {
  UpdateListField_Transaction,
  SortItems_Transaction,
  UpdateListItems_Transaction,
  ReorderItems_Transaction,
  EditItem_Transaction,
} from '../../utils/jsTPS'
import globe from './globe.jpeg'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain'
import UpdateAccount from '../modals/UpdateAccount'
import { useHistory } from 'react-router'
import Header from '../main/Header'

const Homescreen = (props) => {
  const auth = props.user === null ? false : true

  let history = useHistory()

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
      <WMMain>
        {auth === false ? (
          <div>
            <img src={globe} alt='' className='globe-home' />
            <h1 className='home-page-title'>
              Welcome to the World Data Mapper
            </h1>
          </div>
        ) : (
          history.push('/home')
        )}
      </WMMain>
    </WLayout>
  )
}

export default Homescreen
