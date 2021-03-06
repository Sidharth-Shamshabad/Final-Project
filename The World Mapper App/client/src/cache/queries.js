import { gql } from '@apollo/client'

export const GET_DB_USER = gql`
  query GetDBUser {
    getCurrentUser {
      _id
      name
      email
      password
    }
  }
`

// export const GET_DB_TODOS = gql`
//   query GetDBTodos {
//     getAllTodos {
//       _id
//       name
//       owner
//       items {
//         _id
//         description
//         due_date
//         assigned_to
//         completed
//       }
//       sortRule
//       sortDirection
//     }
//   }
// `

export const GET_DB_REGIONS = gql`
  query GetDBRegions {
    getAllRegions {
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

export const GET_REGION_BY_ID = gql`
  query GetRegionById($_id: String!) {
    getRegionById(_id: $_id) {
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

export const GET_ALL_ACTIVE_REGIONS = gql`
  query getAllActiveRegions {
    getAllActiveRegions {
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

export const GET_REGION_PATH = gql`
  query getRegionPath($_id: String!) {
    getRegionPath(_id: $_id) {
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
