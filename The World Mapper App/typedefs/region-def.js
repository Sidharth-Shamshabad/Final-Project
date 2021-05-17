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
    getAllActiveRegions: [Region]
  }
  extend type Mutation {
    createMapFile(region: RegionInput!): Region
    deleteMapFile(_id: String!): Boolean
    editMapFile(_id: String!, field: String!, value: String!): String
    addSubregion(region: RegionInput!, index: Int!): Region
    updateSubregionField(_id: String!, field: String!, value: String!): Region
    removeSubregion(parentId: String!, subregionId: String!): Region
    readdSubregion(_id: String!, field: String!, value: [String]): Region
    sortSubregions(_id: String!, criteria: String!): [Region]
    addLandmark(_id: String!, landmarkName: String!, index: Int!): Region
    editLandmark(_id: String!, newLandmark: String!, index: Int!): Region
    removeLandmark(_id: String!, index: Int!): Region
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
