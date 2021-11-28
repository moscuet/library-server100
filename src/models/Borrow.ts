//SBN:varchar userId:string borrowdate: timestamp returnDate : timestap

/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BorrowDocument = Document & {
  ISBN: string
  customerId: mongoose.ObjectId
  borrowDate: Date
  returnDate: Date
}
const borrowSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    index: true,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: Date.now,
  },
})

// {type: Schema.Types.ObjectId, ref: 'Ingredient'}

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
