import express from 'express'

import {
  createBorrow,
  findById,
  deleteBorrow,
  findAll,
  updateBorrow,
  deleteAll,
} from '../controllers/borrow'

const router = express.Router()

// Every path we define here will get /api/v1/borrows prefix
//router.get('/', findAll)

router.get('/', findAll)
router.get('/:borrowId', findById)
router.put('/:borrowId', updateBorrow)
// deleteAll only for testing
router.delete('/all', deleteAll)

router.delete('/:borrowId', deleteBorrow)
router.post('/', createBorrow)

export default router
