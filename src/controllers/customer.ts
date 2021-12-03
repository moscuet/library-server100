import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

import Customer from '../models/Customer'
import CustomerService from '../services/customer'
import { BadRequestError } from '../helpers/apiError'

// POST /Customers
export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, phoneNumber, address, password } =
    req.body
  console.log(
    'data from cont/customer/createcustomer',
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password
  )
  try {
    const customer = new Customer({
      _id: uuidv4(),
      firstName,
      lastName,
      email,
      phoneNumber: Number(phoneNumber),
      address,
      password,
    })
    const emailCount = await Customer.countDocuments({ email })
    if (emailCount) {
      res.status(409).json({
        status: 'duplicate email',
        statusCode: 409,
        message: 'duplicate email',
      })
      return
    }
    await CustomerService.create(customer)
    res.set('Access-Control-Allow-Origin', '*')
    res.json(customer)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Customers/:customerId
export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const customerId = req.params.customerId
    const updatedCustomer = await CustomerService.update(customerId, update)
    res.json(updatedCustomer)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// //##################

// DELETE /Customers/:customerId
export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CustomerService.deleteCustomer(req.params.customerId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Customers/:customerId
// GET /Authors/:AuthorId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CustomerService.findById(req.params.customerId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//#############

//GET /Customers
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hello')
  try {
    res.json(await CustomerService.findAll())
  } catch (error) {
    console.log('error')
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//Delete All Customer

export const deleteAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CustomerService.deleteAll()
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
