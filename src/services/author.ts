import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'
import { result } from 'lodash'
import Book from '../models/Book'

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId)
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ fisrtName: 1 })
}

const deleteAll = async (): Promise<void> => {
  await Author.deleteMany({})
}

const update = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }
  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const booksWithAuthor = await Book.find({ authors: authorId })
  if (booksWithAuthor.length > 0) {
    throw new Error(
      `Cannot delete author ${authorId} is associated with one or more books.`
    )
  }
  const foundAuthor = await Author.findByIdAndDelete(authorId)
  if (!foundAuthor) {
    throw new Error(`Author ${authorId} not found`)
  }
  return foundAuthor
}

export default {
  create,
  findById,
  findAll,
  deleteAll,
  update,
  deleteAuthor,
}
