import Borrow, { BorrowDocument } from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const create = async (borrow: BorrowDocument): Promise<BorrowDocument> => {
  return borrow.save()
}

const findById = async (borrowId: string): Promise<BorrowDocument> => {
  const foundBorrow = await Borrow.findById(borrowId)
    .populate('customerId')
    .populate('bookId')
  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

const findAll = async (): Promise<BorrowDocument[]> => {
  return Borrow.find().sort({ fisrtName: 1 }).populate('bookId')
}

const findByCustomerId = async (
  customerId: string
): Promise<BorrowDocument[]> => {
  return Borrow.find({ customerId }).populate('bookId')
}

const deleteAll = async (): Promise<void> => {
  await Borrow.deleteMany({})
}

const update = async (
  borrowId: string,
  update: Partial<BorrowDocument>
): Promise<BorrowDocument | null> => {
  const foundBorrow = await Borrow.findByIdAndUpdate(borrowId, update, {
    new: true,
  })

  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

const deleteBorrow = async (
  borrowId: string
): Promise<BorrowDocument | null> => {
  const foundBorrow = Borrow.findByIdAndDelete(borrowId)
  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

export default {
  create,
  findById,
  findAll,
  findByCustomerId,
  deleteAll,
  update,
  deleteBorrow,
}
