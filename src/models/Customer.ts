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
  roles: string
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
    required: [true, 'Email address is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
