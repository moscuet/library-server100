/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type AuthorDocument = Document & {
  _id: mongoose.ObjectId
  firstName: string
  lastName: string
  biography: string
}

const authorSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  biography: {
    type: String,
    maxLength: 255,
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
