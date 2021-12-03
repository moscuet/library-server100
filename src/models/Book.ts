/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

import * as author from './Author'

export type BookDocument = Document & {
  ISBN: string
  title: string
  publisherName: string
  authors: string[]
  publishedYear: number
  genres: string[]
  description: string
  edition: string
  pageCount: number
}

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    index: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publisherName: String,

  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  ],

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

export default mongoose.model<BookDocument>('Book', bookSchema)

// ISBN: string
// title: string
// publisherName: string
// author: string[]
// publishedYear: number
// genres: string[]
// description: string
// edition: string
// pageCount: number

// export type movieType = {
//   ISBN: string
//   title: string
//   publisherName: string
//   authorId: string[]
//   publishedYear: number
//   genres: string[]
//   description: string
//   edition: string
//   pageCount: number
// }