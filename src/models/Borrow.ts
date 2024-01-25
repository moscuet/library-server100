import mongoose, { Document } from 'mongoose'

export type BorrowDocument = Document & {
  bookId: string[]
  customerId: string[]
  borrowDate: Date
  returnDate: Date
  isReturned: boolean
  _id?: string
}
const borrowSchema = new mongoose.Schema({
  bookId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
  customerId: [
    {
      type: String,
      ref: 'Customer',
      required: true,
    },
  ],
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000),
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
