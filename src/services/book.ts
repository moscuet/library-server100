import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1, publishedYear: -1 })
  // return Book.find().sort({ name: 1, publishedYear: -1 })
}

const findAllAndPopulate = async (): Promise<BookDocument[]> => {
  console.log('findall populate service')
  return Book.find().sort({ name: 1, publishedYear: -1 }).populate('authors')
  // return Book.find().sort({ name: 1, publishedYear: -1 })
}

const deleteAll = async (): Promise<BookDocument[] | null> => {
  return Book.remove({})
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findById,
  findAll,
  deleteAll,
  update,
  deleteBook,
  findAllAndPopulate,
}
