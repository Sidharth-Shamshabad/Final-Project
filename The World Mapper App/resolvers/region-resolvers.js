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
        return newRegion
      }
    },
    deleteMapFile: async (_, args) => {
      const { _id } = args
      const objectId = new ObjectId(_id)
      const deleted = await Region.deleteOne({ _id: objectId })
      if (deleted) return true
      else return false
    },
    editMapFile: async (_, args) => {
      const { field, value, _id } = args
      const objectId = new ObjectId(_id)
      const updated = await Region.updateOne(
        { _id: objectId },
        { [field]: value }
      )
      if (updated) return value
      else return ''
    },
    addSubregion: async (_, args) => {
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

      const parent = await Region.findOne({ _id: parentRegion })
      let updatedSubregionsList = parent.subregions
      updatedSubregionsList.push(objectId)

      const parentUpdated = await Region.updateOne(
        { _id: parentRegion },
        { subregions: updatedSubregionsList }
      )
      if (parentUpdated) return updated
      else return 'Could not add subregion'
    },
    updateSubregionField: async (_, args) => {
      const { _id, field } = args
      let { value } = args
      const id = new ObjectId(_id)
      const found = await Region.findOne({ _id: id })
      let updatedRegion = found
      updatedRegion[field] = value
      console.log('initial value', found)
      const updated = await Region.updateOne({ _id: id }, { [field]: value })
      console.log('updated value', updatedRegion)
      if (updated) return updatedRegion
      else return found
    },
  },
}
