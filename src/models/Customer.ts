/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type CustomerDocument = Document & {
  _id: mongoose.ObjectId
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  address: string
  password: string
  roles: mongoose.ObjectId[]
}

const customerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phoneNumber: Number,
  address: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
})

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
