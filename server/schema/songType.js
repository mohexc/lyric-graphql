const Song = require('../models/songModel')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require('graphql')
const LyricType = require('./lyricType')

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve: async (parentValue, args) => {
        const lyrics = await Song.findLyrics(parentValue._id)
        return lyrics
      }
    },
  })
})

module.exports = SongType