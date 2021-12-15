/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

import * as author from './Author'

export type BookDocument = Document & {
  ISBN: string
  title: string
  publisherName: string
  author: string[]
  publishedYear: number
  genres: string[]
  description: string
  edition: string
  pageCount: number
  img: string
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
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  ],

  publishedYear: {
    type: Number,
    required: true,
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
  img: String,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
