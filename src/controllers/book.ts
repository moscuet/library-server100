import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

// POST /books

export const findByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const q1 = req.query.catagory
  try {
    res.json(await BookService.findByQuery())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      ISBN,
      title,
      publisherName,
      author,
      publishedYear,
      genres,
      description,
      edition,
      pageCount,
      img,
    } = req.body

    const book = new Book({
      ISBN,
      title,
      publisherName,
      authors: author ? author.split(',') : '',
      publishedYear,
      genres: genres ? genres.split(',') : '',
      description,
      edition,
      pageCount,
      img,
    })
    await BookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(error.statusCode).send({ message: error.message })
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId
export const findByIdAndPopulate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findByIdAndPopulate(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//

export const findAllAndPopulate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAllAndPopulate())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Delete All Book

export const deleteAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteAll()
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
