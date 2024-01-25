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

router.get('/:customerId', findById)

router.put('/:customerId', updateCustomer)

router.delete('/:customerId', deleteCustomer)

export default router
