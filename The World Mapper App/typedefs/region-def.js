const { gql } = require('apollo-server')

const typeDefs = gql`
  type Region {
    _id: String!
    id: Int!
    name: String!
    owner: String!
    parentRegion: String!
    subregions: [String]
    capital: String!
    leader: String!
    flag: String!
    landmarks: [String]
    sortRule: String!
    sortDirection: Int!
  }
  extend type Query {
    getAllRegions: [Region]
    getRegionById(_id: String!): Region
  }
  extend type Mutation {
    createMapFile(region: RegionInput!): Region
    deleteMapFile(_id: String!): Boolean
  }
  input RegionInput {
    _id: String
    id: Int
    name: String
    owner: String
    parentRegion: String
    subregions: [String]
    capital: String
    leader: String
    flag: String
    landmarks: [String]
    sortRule: String
    sortDirection: Int
  }
`

module.exports = { typeDefs: typeDefs }
