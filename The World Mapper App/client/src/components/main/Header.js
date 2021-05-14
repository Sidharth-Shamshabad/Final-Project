import Logo from '../navbar/Logo'
import Login from '../modals/Login'
import Delete from '../modals/Delete'
import MainContents from '../main/MainContents'
import CreateAccount from '../modals/CreateAccount'
import NavbarOptions from '../navbar/NavbarOptions'
import * as mutations from '../../cache/mutations'
import SidebarContents from '../sidebar/SidebarContents'
import { GET_DB_TODOS, GET_REGION_BY_ID } from '../../cache/queries'
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
import { useHistory, useParams } from 'react-router'

const Header = (props) => {
  // const keyCombination = (e, callback) => {
  //   if (e.key === 'z' && e.ctrlKey) {
  //     if (props.tps.hasTransactionToUndo()) {
  //       tpsUndo()
  //     }
  //   } else if (e.key === 'y' && e.ctrlKey) {
  //     if (props.tps.hasTransactionToRedo()) {
  //       tpsRedo()
  //     }
  //   }
  // }
  // document.onkeydown = keyCombination
  const auth = props.user === null ? false : true
  let todolists = []
  let SidebarData = []
  const [sortRule, setSortRule] = useState('unsorted') // 1 is ascending, -1 desc
  const [activeList, setActiveList] = useState({})
  const [showDelete, toggleShowDelete] = useState(false)
  const [showLogin, toggleShowLogin] = useState(false)
  const [showCreate, toggleShowCreate] = useState(false)
  const [showUpdate, toggleShowUpdate] = useState(false)
  const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo())
  const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo())

  let history = useHistory()

  const setShowLogin = () => {
    toggleShowDelete(false)
    toggleShowCreate(false)
    toggleShowUpdate(false)
    toggleShowLogin(!showLogin)
  }

  const setShowCreate = () => {
    toggleShowDelete(false)
    toggleShowLogin(false)
    toggleShowUpdate(false)
    toggleShowCreate(!showCreate)
  }

  const setShowUpdate = () => {
    console.log('setShowUpdate test', showUpdate)
    toggleShowDelete(false)
    toggleShowCreate(false)
    toggleShowLogin(false)
    toggleShowUpdate(!showUpdate)
    console.log('setShowUpdate test2', showUpdate)
  }

  const background_color = 'black'

  let params = useParams()
  // const regionID = params.any

  console.log(!!props.leftSibling)
  console.log(!!props.rightSibling)
  console.log(props.leftSibling)

  const clickDisabled = () => {}
  const buttonStyle = props.disabled
    ? ' table-header-button-disabled '
    : 'table-header-button '

  const leftSiblingOptions = {
    className: !props.leftSibling
      ? ' table-header-button-disabled '
      : 'table-header-button',
    onClick: !props.leftSibling
      ? clickDisabled
      : history.push(`/subregion/${props.leftSibling}`),
    wType: 'texted',
    clickAnimation: !props.leftSibling ? '' : 'ripple-light',
    shape: 'rounded',
  }

  const rightSiblingOptions = {
    className: !props.rightSibling
      ? ' table-header-button-disabled '
      : 'table-header-button ',
    // onClick: !props.rightSibling
    //   ? clickDisabled
    //   : history.push(`/subregion/${props.leftSibling}`),
    wType: 'texted',
    clickAnimation: !props.rightSibling ? '' : 'ripple-light',
    shape: 'rounded',
  }

  return (
    <div className='wLheader'>
      <WLHeader>
        <WNavbar style={{ backgroundColor: background_color }}>
          <ul>
            <WNavItem onClick={() => history.push('/home')} className='pointer'>
              <Logo className='logo' />
            </WNavItem>
          </ul>
          <ul>
            <NavbarOptions
              fetchUser={props.fetchUser}
              auth={auth}
              setShowCreate={setShowCreate}
              setShowLogin={setShowLogin}
              setShowUpdate={setShowUpdate}
              // reloadRegions={refetch}
              // setActiveList={loadTodoList}
              setActiveRegion={props.setActiveRegion}
              user={props.user}
            />
          </ul>
        </WNavbar>
      </WLHeader>

      {showCreate && (
        <CreateAccount
          fetchUser={props.fetchUser}
          setShowCreate={setShowCreate}
        />
      )}

      {showLogin && (
        <Login
          fetchUser={props.fetchUser}
          user={props.user}
          // reloadTodos={refetch}
          setShowLogin={setShowLogin}
        />
      )}

      {showUpdate && (
        <UpdateAccount
          fetchUser={props.fetchUser}
          user={props.user}
          setShowUpdate={setShowUpdate}
        />
      )}
    </div>
  )
}

export default Header
