// userID : string
// firstName : string varchar (55) lastName : string varchar (55) email: string phoneNumber:int
// address: varchar(255)

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
    // trim: true,
    // lowercase: true,
    // unique: true,
    // required: 'Email address is required'
  },
  phoneNumber: Number,
  address: String,
})
export default mongoose.model<CustomerDocument>('Customer', customerSchema)
