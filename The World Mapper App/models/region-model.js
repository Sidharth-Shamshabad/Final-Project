const { model, Schema, ObjectId } = require('mongoose')

const regionSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    parentRegion: {
      type: String,
      required: true,
    },
    subregions: {
      type: [String],
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    landmarks: {
      type: [String],
      required: true,
    },
    sortRule: {
      type: String,
      required: true,
    },
    sortDirection: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Region = model('Region', regionSchema)
module.exports = Region
