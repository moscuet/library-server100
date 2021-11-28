import express from 'express'

import {
  createMovie,
  findById,
  deleteMovie,
  findAll,
  updateMovie,
  deleteAll,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
//router.get('/', findAll)

router.get('/', findAll)
router.get('/:movieId', findById)
router.put('/:movieId', updateMovie)
// deleteAll only for testing
router.delete('/all', deleteAll)

router.delete('/:movieId', deleteMovie)
router.post('/', createMovie)

export default router
