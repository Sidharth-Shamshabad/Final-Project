import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      _id
      name
      password
    }
  }
`

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      email
      password
      name
    }
  }
`
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export const UPDATE = gql`
  mutation Update(
    $_id: String!
    $email: String!
    $name: String!
    $password: String!
  ) {
    update(_id: $_id, email: $email, name: $name, password: $password) {
      email
      name
      password
    }
  }
`

export const CREATE_MAP_FILE = gql`
  mutation CreateMapFile($region: RegionInput!) {
    createMapFile(region: $region) {
      _id
      id
      name
      owner
      parentRegion
      subregions
      capital
      leader
      flag
      landmarks
      sortRule
      sortDirection
    }
  }
`

export const DELETE_MAP_FILE = gql`
  mutation DeleteMapFile($_id: String!) {
    deleteMapFile(_id: $_id)
  }
`

export const EDIT_MAP_FILE = gql`
  mutation EditMapFile($_id: String!, $field: String!, $value: String!) {
    editMapFile(_id: $_id, field: $field, value: $value)
  }
`

export const ADD_SUBREGION = gql`
  mutation AddSubregion($region: RegionInput!) {
    addSubregion(region: $region) {
      _id
      id
      name
      owner
      parentRegion
      subregions
      capital
      leader
      flag
      landmarks
      sortRule
      sortDirection
    }
  }
`

export const UPDATE_SUBREGION_FIELD = gql`
  mutation UpdateSubregionField(
    $_id: String!
    $field: String!
    $value: String!
  ) {
    updateSubregionField(_id: $_id, field: $field, value: $value) {
      _id
      id
      name
      owner
      parentRegion
      subregions
      capital
      leader
      flag
      landmarks
      sortRule
      sortDirection
    }
  }
`

export const ADD_ITEM = gql`
  mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
    addItem(item: $item, _id: $_id, index: $index)
  }
`

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: String!, $_id: String!) {
    deleteItem(itemId: $itemId, _id: $_id) {
      _id
      description
      due_date
      assigned_to
      completed
    }
  }
`

export const UPDATE_ITEM_FIELD = gql`
  mutation UpdateItemField(
    $_id: String!
    $itemId: String!
    $field: String!
    $value: String!
    $flag: Int!
  ) {
    updateItemField(
      _id: $_id
      itemId: $itemId
      field: $field
      value: $value
      flag: $flag
    ) {
      _id
      description
      due_date
      assigned_to
      completed
    }
  }
`

export const REORDER_ITEMS = gql`
  mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
    reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
      _id
      description
      due_date
      assigned_to
      completed
    }
  }
`

export const SORT_ITEMS = gql`
  mutation SortItems($_id: String!, $criteria: String!) {
    sortItems(_id: $_id, criteria: $criteria) {
      _id
      description
      due_date
      assigned_to
      completed
    }
  }
`

export const ADD_TODOLIST = gql`
  mutation AddTodolist($todolist: TodoInput!) {
    addTodolist(todolist: $todolist) {
      _id
      name
      owner
      items {
        _id
        description
        due_date
        assigned_to
        completed
      }
      sortRule
      sortDirection
    }
  }
`

export const DELETE_TODOLIST = gql`
  mutation DeleteTodolist($_id: String!) {
    deleteTodolist(_id: $_id)
  }
`

export const UPDATE_TODOLIST_FIELD = gql`
  mutation UpdateTodolistField(
    $_id: String!
    $field: String!
    $value: String!
  ) {
    updateTodolistField(_id: $_id, field: $field, value: $value)
  }
`
