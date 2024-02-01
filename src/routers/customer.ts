import express from 'express'

import {
  findById,
  deleteCustomer,
  findAll,
  updateCustomer,
  deleteAll,
} from '../controllers/customer'

const router = express.Router()

router.get('/', findAll)

router.delete('/', deleteAll)

router.get('/:customerId', findById)

router.put('/:customerId', updateCustomer)

router.delete('/:customerId', deleteCustomer)

export default router
