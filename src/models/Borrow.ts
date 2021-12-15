//SBN:varchar userId:string borrowdate: timestamp returnDate : timestap

/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BorrowDocument = Document & {
  bookId: string
  customerId: string
  borrowDate: Date
  returnDate: Date
}
const borrowSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    ref: 'Book',
  },
  customerId: {
    type: String,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000),
  },
})

// {type: Schema.Types.ObjectId, ref: 'Ingredient'}

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
