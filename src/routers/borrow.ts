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

router.get('/', findAll)

router.get('/:borrowId', findById)

router.put('/:borrowId', updateBorrow)

router.delete('/:borrowId', deleteBorrow)

router.post('/', createBorrow)

export default router
