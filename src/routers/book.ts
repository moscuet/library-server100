import express from 'express'

import {
  createBook,
  findByIdAndPopulate,
  deleteBook,
  findAll,
  findByQuery,
  findAllAndPopulate,
  updateBook,
  deleteAll,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/books prefix

router.get('/catagory', findByQuery)

router.get('/all', findAllAndPopulate)

router.get('/', findAll)

router.get('/:bookId', findByIdAndPopulate)

router.put('/:bookId', updateBook)

router.delete('/:bookId', deleteBook)

router.post('/', createBook)

export default router
