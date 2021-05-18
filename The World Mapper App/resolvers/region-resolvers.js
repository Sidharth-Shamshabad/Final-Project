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
    getAllActiveRegions: async (_, __, { req }) => {
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
    },
    getRegionPath: async (_, args) => {
      const { _id } = args
      const objectId = new ObjectId(_id)
      let region = await Region.findOne({ _id: objectId })
      let regionPath = []
      let currentRegion = await Region.findOne({ _id: objectId })
      while (currentRegion.parentRegion !== 'none') {
        regionPath.push(currentRegion)
        currentRegion = await Region.findOne({
          _id: currentRegion.parentRegion,
        })
      }
      regionPath.push(currentRegion)
      regionPath = regionPath.reverse()
      return regionPath
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
      console.log('addSubregion working')
      const { region, index } = args
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

      let updated = null

      const parent = await Region.findOne({ _id: parentRegion })
      let updatedSubregionsList = parent.subregions
      if (index < 0) {
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
        updated = await newRegion.save()
        updatedSubregionsList.push(objectId)
      } else {
        updatedSubregionsList.splice(index, 0, _id)
      }

      const parentUpdated = await Region.updateOne(
        { _id: parentRegion },
        { subregions: updatedSubregionsList }
      )
      if (parentUpdated) return updated
      else return 'Could not add subregion'
    },
    updateSubregionField: async (_, args) => {
      console.log('UPDATE SUBREGION RESOLVER')
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
    removeSubregion: async (_, args) => {
      const { parentId, subregionId } = args
      const id = new ObjectId(parentId)
      const found = await Region.findOne({ _id: id })
      let updatedRegion = found
      console.log(subregionId)
      // let newSubregions = updatedRegion.subregions
      for (let i = 0; i < updatedRegion.subregions.length; i++) {
        const element = updatedRegion.subregions[i]
        if (element === subregionId) {
          updatedRegion.subregions.splice(i, 1)
        }
      }
      const updated = await Region.updateOne(
        { _id: parentId },
        { subregions: updatedRegion.subregions }
      )
      if (updated) return updatedRegion
      else return found
    },
    readdSubregion: async (_, args) => {
      const { parentId, childId, index } = args
      const id = new ObjectId(parentId)
      const found = await Region.findOne({ _id: id })
      let updatedRegion = found.subregions
      updatedRegion.splice(index, 0, childId)
      // console.log('initial value', found)
      const updated = await Region.updateOne(
        { _id: id },
        { subregions: updatedRegion }
      )
      // console.log('updated value', updatedRegion)
      const newUpdated = await Region.findOne({ _id: id })
      if (updated) return newUpdated
      else return found
    },
    sortSubregions: async (_, args) => {
      const { _id, criteria } = args
      const regionId = new ObjectId(_id)
      const parentRegion = await Region.findOne({ _id: regionId })
      let subregionIds = parentRegion.subregions
      let subregions = []
      for (let i = 0; i < subregionIds.length; i++) {
        const element = subregionIds[i]
        const subregion = await Region.findOne({ _id: element })
        subregions.push(subregion)
      }
      let newDirection = parentRegion.sortDirection === 1 ? -1 : 1
      console.log(newDirection, parentRegion.sortDirection)
      let sortedRegions

      switch (criteria) {
        case 'name':
          sortedRegions = Sorting.byName(subregions, newDirection)
          break
        case 'capital':
          sortedRegions = Sorting.byCapital(subregions, newDirection)
          break
        case 'leader':
          sortedRegions = Sorting.byLeader(subregions, newDirection)
          break
        default:
          return parentRegion.subregions
      }
      let sortedIds = []
      for (let i = 0; i < sortedRegions.length; i++) {
        const element = sortedRegions[i]._id
        sortedIds.push(element)
      }
      const updated = await Region.updateOne(
        { _id: regionId },
        {
          subregions: sortedIds,
          sortRule: criteria,
          sortDirection: newDirection,
        }
      )
      if (updated) return sortedRegions
    },
    reorderItems: async (_, args) => {
      const { _id, itemId, direction } = args
      const listId = new ObjectId(_id)
      const found = await Todolist.findOne({ _id: listId })
      let listItems = found.items
      const index = listItems.findIndex(
        (item) => item._id.toString() === itemId
      )
      // move selected item visually down the list
      if (direction === 1 && index < listItems.length - 1) {
        let next = listItems[index + 1]
        let current = listItems[index]
        listItems[index + 1] = current
        listItems[index] = next
      }
      // move selected item visually up the list
      else if (direction === -1 && index > 0) {
        let prev = listItems[index - 1]
        let current = listItems[index]
        listItems[index - 1] = current
        listItems[index] = prev
      }
      const updated = await Todolist.updateOne(
        { _id: listId },
        { items: listItems }
      )
      if (updated) return listItems
      // return old ordering if reorder was unsuccessful
      listItems = found.items
      return found.items
    },
    addLandmark: async (_, args) => {
      const { _id, landmarkName, index } = args

      const region = await Region.findOne({ _id: _id })
      let landmarks = region.landmarks

      if (index < 0) landmarks.push(landmarkName)
      else landmarks.splice(index, 0, landmarkName)

      const updatedRegion = await Region.updateOne(
        { _id: _id },
        { landmarks: landmarks }
      )
      const newRegion = await Region.findOne({ _id: _id })
      if (updatedRegion) return newRegion
      // else return 'Could not add subregion'
    },
    editLandmark: async (_, args) => {
      const { _id, newLandmark, index } = args
      const region = await Region.findOne({ _id: _id })
      let landmarks = region.landmarks
      landmarks[index] = newLandmark
      const updatedRegion = await Region.updateOne(
        { _id: _id },
        { landmarks: landmarks }
      )
      const newRegion = await Region.findOne({ _id: _id })
      if (updatedRegion) return newRegion
    },
    removeLandmark: async (_, args) => {
      const { _id, index } = args
      const region = await Region.findOne({ _id: _id })
      let landmarks = region.landmarks
      landmarks.splice(index, 1)
      const updatedRegion = await Region.updateOne(
        { _id: _id },
        { landmarks: landmarks }
      )
      const newRegion = await Region.findOne({ _id: _id })
      if (updatedRegion) return newRegion
    },
    changeRegionParent: async (_, args) => {
      const { subregionId, oldParentId, newParentId } = args
      let oldParent = await Region.findOne({ _id: oldParentId })
      let newParent = await Region.findOne({ _id: newParentId })

      let oldParentSubregions = oldParent.subregions
      let newParentSubregions = newParent.subregions

      for (let i = 0; i < oldParentSubregions.length; i++) {
        const element = oldParentSubregions[i]
        if (element === subregionId) {
          console.log('test')
          oldParentSubregions.splice(i, 1)
          break
        }
      }
      console.log(oldParentSubregions)
      let oldParentUpdated = await Region.updateOne(
        { _id: oldParentId },
        { subregions: oldParentSubregions }
      )
      newParentSubregions.push(subregionId)
      let newParentUpdated = await Region.updateOne(
        { _id: newParentId },
        { subregions: newParentSubregions }
      )
      console.log(newParentSubregions)
      let updatedParent = await Region.findOne({ _id: newParentId })
      if (newParentUpdated) return updatedParent
    },
  },
}
