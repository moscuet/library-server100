/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type MovieDocument = Document & {
  ISBN: string
  title: string
  publisherName: string
  authorName: string[]
  publishedYear: number
  genres: string[]
  description: string
  edition: string
  pageCount: number
}
const movieSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    index: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    // maxLength:99
  },
  publisherName: String,

  authorName: {
    type: String,
    required: true,
    // maxLength:55
  },

  publishedYear: {
    type: Number,
    required: true,
    min: 1900,
  },

  genres: [String],
  description: {
    type: String,
    maxLength: 255,
  },
  edition: String,
  pageCount: {
    type: Number,
    required: true,
    min: 2,
  },
})

export default mongoose.model<MovieDocument>('Movie', movieSchema)
