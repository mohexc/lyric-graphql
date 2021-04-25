const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const Lyric = require("../models/lyricModel");
const Song = require("../models/songModel");
const LyricType = require("./lyricType");
const SongType = require("./songType");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve: async (parentValue, args) => {
        const song = new Song({ title: args.title })
        const createSong = await song.save()
        return createSong
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve: (parentValue, args) => {
        const result = Song.addLyric(args.songId, args.content)
        return result
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, args) => {
        return Lyric.like(id)
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, args) => {
        return Song.remove({ _id: args.id })
      }
    }
  }
})

module.exports = mutation