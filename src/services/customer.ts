import Customer, { CustomerDocument } from '../models/Customer'
import { NotFoundError } from '../helpers/apiError'

const create = async (
  customer: CustomerDocument
): Promise<CustomerDocument> => {
  return customer.save()
}

const findById = async (customerId: string): Promise<CustomerDocument> => {
  const foundCustomer = await Customer.findById(customerId)
  if (!foundCustomer) {
    throw new NotFoundError(`Author ${customerId} not found`)
  }
  return foundCustomer
}

const findAll = async (): Promise<CustomerDocument[]> => {
  return Customer.find()
}

const deleteAll = async (): Promise<CustomerDocument[] | null> => {
  return Customer.remove({})
}

const update = async (
  customerId: string,
  update: Partial<CustomerDocument>
): Promise<CustomerDocument | null> => {
  const foundCustomer = await Customer.findByIdAndUpdate(customerId, update, {
    new: true,
  })

  if (!foundCustomer) {
    throw new NotFoundError(`Customer ${customerId} not found`)
  }

  return foundCustomer
}

const deleteCustomer = async (
  customerId: string
): Promise<CustomerDocument | null> => {
  console.log(customerId)
  const foundCustomer = Customer.findByIdAndDelete(customerId)
  if (!foundCustomer) {
    throw new NotFoundError(`Customer ${customerId} not found`)
  }

  return foundCustomer
}

export default {
  create,
  findById,
  findAll,
  deleteAll,
  update,
  deleteCustomer,
}
