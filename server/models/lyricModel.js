const mongoose = require('mongoose')

const lyricSchema = mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  },
  likes: {
    type: Number,
    default: 0
  },
  content: {
    type: String
  }
})

lyricSchema.statics.like = async function (id) {
  const Lyric = mongoose.model('lyric');
  const lyric = await Lyric.findById(id)
  lyric.like = lyric.like++
  return lyric.save()
}

const Lyric = mongoose.model("Lyric", lyricSchema)

module.exports = Lyric