import express from 'express'

import {
  findById,
  deleteCustomer,
  findAll,
  updateCustomer,
  deleteAll,
} from '../controllers/customer'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.get('/', findAll)

router.get('/:customerId', findById)

router.put('/:customerId', updateCustomer)

router.delete('/:customerId', deleteCustomer)

// deleteAll only for testing
router.delete('/all', deleteAll)

export default router
