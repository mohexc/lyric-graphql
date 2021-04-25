
const graphql = require('graphql')
const Lyric = require('../models/lyricModel')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./songType'),
      resolve: async (parentValue, args) => {
        const lyric = await Lyric.findById(parentValue).populate('song')
        return lyric.song
      }
    },
  })
})

module.exports = LyricType