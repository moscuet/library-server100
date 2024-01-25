/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & authorType

export type authorType = {
  firstName: string
  lastName: string
  biography: string
}

const authorSchema = new mongoose.Schema({
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
