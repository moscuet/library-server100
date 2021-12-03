import express from 'express'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  findAllAndPopulate,
  updateBook,
  deleteAll,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
//router.get('/', findAll)

router.get('/all', findAllAndPopulate)
router.get('/', findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updateBook)

// deleteAll only for testing
router.delete('/all', deleteAll)

router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
