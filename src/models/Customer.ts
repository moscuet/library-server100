/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type TCustomer = {
  _id: string
  firstName: string
  lastName: string
  useremail: string
  phoneNumber: number
  address: string
  password: string
  roles: 'user' | 'moderator' | 'admin' // Use enum values directly
  img?: string
}

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
    required: [true, 'Email address is required'], // Use an array for required message
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phoneNumber: {
    type: Number, // Define the type explicitly
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Use an array for required message
  },
  roles: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user',
  },
  img: {
    type: String,
  },
})

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
