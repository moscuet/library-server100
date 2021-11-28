import express from 'express'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
  deleteAll,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAll)
router.get('/:authorId', findById)
router.put('/:authorId', updateAuthor)

//deleteAll only for testing
router.delete('/all', deleteAll)
router.delete('/:authorId', deleteAuthor)
router.post('/', createAuthor)

export default router
