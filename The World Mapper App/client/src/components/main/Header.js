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

const Header = (props) => {
  const keyCombination = (e, callback) => {
    if (e.key === 'z' && e.ctrlKey) {
      if (props.tps.hasTransactionToUndo()) {
        tpsUndo()
      }
    } else if (e.key === 'y' && e.ctrlKey) {
      if (props.tps.hasTransactionToRedo()) {
        tpsRedo()
      }
    }
  }
  document.onkeydown = keyCombination
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

  const { loading, error, data, refetch } = useQuery(GET_DB_TODOS)

  if (loading) {
    console.log(loading, 'loading')
  }
  if (error) {
    console.log(error, 'error')
  }
  if (data) {
    // Assign todolists
    for (let todo of data.getAllTodos) {
      todolists.push(todo)
    }
    // if a list is selected, shift it to front of todolists
    if (activeList._id) {
      let selectedListIndex = todolists.findIndex(
        (entry) => entry._id === activeList._id
      )
      let removed = todolists.splice(selectedListIndex, 1)
      todolists.unshift(removed[0])
    }
    // create data for sidebar links
    for (let todo of todolists) {
      if (todo) {
        SidebarData.push({ _id: todo._id, name: todo.name })
      }
    }
  }
  let history = useHistory()
  function pushToHome() {
    history.push('/home')
  }

  // NOTE: might not need to be async
  const reloadList = async () => {
    if (activeList._id) {
      let tempID = activeList._id
      let list = todolists.find((list) => list._id === tempID)
      setActiveList(list)
    }
  }

  const loadTodoList = (list) => {
    props.tps.clearAllTransactions()
    setCanUndo(props.tps.hasTransactionToUndo())
    setCanRedo(props.tps.hasTransactionToRedo())
    setActiveList(list)
  }

  const mutationOptions = {
    refetchQueries: [{ query: GET_DB_TODOS }],
    awaitRefetchQueries: true,
    onCompleted: () => reloadList(),
  }

  const [ReorderTodoItems] = useMutation(
    mutations.REORDER_ITEMS,
    mutationOptions
  )
  const [sortTodoItems] = useMutation(mutations.SORT_ITEMS, mutationOptions)
  const [UpdateTodoItemField] = useMutation(
    mutations.UPDATE_ITEM_FIELD,
    mutationOptions
  )
  const [UpdateTodolistField] = useMutation(
    mutations.UPDATE_TODOLIST_FIELD,
    mutationOptions
  )
  const [DeleteTodoItem] = useMutation(mutations.DELETE_ITEM, mutationOptions)
  const [AddTodoItem] = useMutation(mutations.ADD_ITEM, mutationOptions)
  const [AddTodolist] = useMutation(mutations.ADD_TODOLIST)
  const [DeleteTodolist] = useMutation(mutations.DELETE_TODOLIST)

  const tpsUndo = async () => {
    const ret = await props.tps.undoTransaction()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
    }
  }

  const tpsRedo = async () => {
    const ret = await props.tps.doTransaction()
    if (ret) {
      setCanUndo(props.tps.hasTransactionToUndo())
      setCanRedo(props.tps.hasTransactionToRedo())
    }
  }

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

  const setShowDelete = () => {
    toggleShowCreate(false)
    toggleShowLogin(false)
    toggleShowUpdate(false)
    toggleShowDelete(!showDelete)
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

  return (
    <WLayout wLayout='header'>
      <WLHeader>
        <WNavbar style={{ backgroundColor: background_color }}>
          <ul>
            <WNavItem>
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
              reloadTodos={refetch}
              setActiveList={loadTodoList}
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
          reloadTodos={refetch}
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
    </WLayout>
  )
}

export default Header
