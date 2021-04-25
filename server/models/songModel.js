const mongoose = require('mongoose')
const Lyric = require('./lyricModel')


const songSchema = mongoose.Schema({
  title: { type: String, },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lyrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lyric'
    }
  ],
})

songSchema.statics.addLyric = async function (id, content) {
  const song = await this.findById(id)
  const lyric = new Lyric({ content, song })
  song.lyrics.push(lyric)
  const resultLyricSave = await lyric.save()
  const resultSongSave = await song.save()
  return resultSongSave
}

songSchema.statics.findLyrics = async function (id) {
  const song = await this.findById(id).populate('lyrics')
  return song.lyrics
}

const Song = mongoose.model("Song", songSchema)

module.exports = Song