import mongoose, { Document } from 'mongoose'

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
  img?: string
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
  },

  genres: [String],
  description: {
    type: String,
    maxLength: 980,
  },
  edition: String,
  pageCount: {
    type: Number,
    required: true,
    min: 10,
  },
  img: String,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
