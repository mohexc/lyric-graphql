const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const Lyric = require("../models/lyricModel");
const Song = require("../models/songModel");
const LyricType = require("./lyricType");
const SongType = require("./songType");


const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve: () => {
        return Song.find({})
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parentValue, args) => {
        return Song.findById(args.id)
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parentValue, args) => {
        return Lyric.findById(id)
      }
    }
  })
})

module.exports = query