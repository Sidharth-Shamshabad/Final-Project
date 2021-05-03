const ObjectId = require('mongoose').Types.ObjectId
const Region = require('../models/region-model')
const Sorting = require('../utils/sorting')

module.exports = {
  Query: {
    /** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
    getAllRegions: async (_, __, { req }) => {
      const _id = new ObjectId(req.userId)
      if (!_id) {
        return []
      }
      const regions = await Region.find({ owner: _id }).sort({
        updatedAt: 'descending',
      })
      console.log(regions)
      const parentRegions = regions.filter(
        (region) => region.parentRegion === 'none'
      )
      if (parentRegions) {
        return parentRegions
      }
    },
    /** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
    getRegionById: async (_, args) => {
      const { _id } = args
      const objectId = new ObjectId(_id)
      const region = await Region.findOne({ _id: objectId })
      if (region) return region
      else return {}
    },
  },
  Mutation: {
    createMapFile: async (_, args) => {
      const { region } = args
      const objectId = new ObjectId()
      const {
        _id,
        id,
        name,
        owner,
        parentRegion,
        subregions,
        capital,
        leader,
        flag,
        landmarks,
        sortRule,
        sortDirection,
      } = region
      const newRegion = new Region({
        _id: objectId,
        id: id,
        name: name,
        owner: owner,
        parentRegion: parentRegion,
        subregions: subregions,
        capital: capital,
        leader: leader,
        flag: flag,
        landmarks: landmarks,
        sortRule: sortRule,
        sortDirection: sortDirection,
      })
      const updated = await newRegion.save()
      if (updated) {
        console.log(newRegion)
        return newRegion
      }
    },
  },
}
