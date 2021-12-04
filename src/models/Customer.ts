/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type TCustomer = {
  _id: mongoose.ObjectId
  firstName: string
  lastName: string
  useremail: string
  phoneNumber: number
  address: string
  password: string
}
// roles: mongoose.ObjectId[]

export type CustomerDocument = Document & TCustomer

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
  useremail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phoneNumber: Number,
  address: String,
  password: {
    type: String,
    required: 'Passwordr equired',
  },
})
// roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
