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
import { WButton, WNavbar, WSidebar, WNavItem } from 'wt-frontend'
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
    toggleShowDelete(false)
    toggleShowCreate(false)
    toggleShowLogin(false)
    toggleShowUpdate(!showUpdate)
  }

  const background_color = 'black'

  let params = useParams()
  // const regionID = params.any

  let parentRegionInfo = {}
  let parentRegionId = ''
  const siblings = []

  if (props.activeRegion) {
    parentRegionId = props.activeRegion.parentRegion
  }
  const parentRegion = useQuery(GET_REGION_BY_ID, {
    variables: { _id: parentRegionId },
  })

  if (parentRegion.data) {
    const currentActiveRegion = parentRegion.data.getRegionById
    parentRegionInfo = currentActiveRegion
    for (let i = 0; i < parentRegionInfo.subregions.length; i++) {
      const element = parentRegionInfo.subregions[i]
      siblings.push(element)
    }
  }

  let leftSibling = ''
  let rightSibling = ''

  for (let i = 0; i < siblings.length; i++) {
    const element = siblings[i]
    if (element == props.activeRegion._id) {
      leftSibling = siblings[i - 1]
      rightSibling = siblings[i + 1]
    }
  }

  const clickDisabled = () => {}

  const leftSiblingOptions = {
    className: !leftSibling
      ? ' table-header-button-disabled '
      : 'table-header-button',
    wType: 'texted',
    clickAnimation: !leftSibling ? '' : 'ripple-light',
    shape: 'rounded',
  }

  const rightSiblingOptions = {
    className: !rightSibling
      ? ' table-header-button-disabled '
      : 'table-header-button ',
    wType: 'texted',
    clickAnimation: !rightSibling ? '' : 'ripple-light',
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
          <WButton
            {...leftSiblingOptions}
            onClick={() => {
              if (!leftSibling) {
                clickDisabled()
              } else {
                history.push(`/subregion/${leftSibling}`)
              }
            }}
            style={{ padding: '0px' }}
          >
            <i className='material-icons'>arrow_left</i>
          </WButton>
          <WButton
            {...rightSiblingOptions}
            onClick={() => {
              if (!rightSibling) {
                clickDisabled()
              } else {
                history.push(`/subregion/${rightSibling}`)
              }
            }}
            style={{ padding: '0px' }}
          >
            <i className='material-icons'>arrow_right</i>
          </WButton>
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
