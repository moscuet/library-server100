import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

import Customer from '../models/Customer'
import CustomerService from '../services/customer'
import { BadRequestError } from '../helpers/apiError'

// POST /Customers
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { useremail, password } = req.body
  console.log('data from cont/customer/signin', req.body)
  try {
    if (!useremail || !password)
      return res.status(400).json({ message: 'Missing Data' })

    // one way to check if email already registered
    // const emailCount = await Customer.countDocuments({ email })
    // await CustomerService.create(customer)
    // res.set('Access-Control-Allow-Origin', '*')
    // res.json(customer)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error instanceof Error && error.message.indexOf('11000')) {
      res.status(409).json({
        status: 'duplicate email',
        statusCode: 409,
        // message: `Email ${email} already registered`,
      })
      return
    } else {
      next(error)
    }
  }
}

// POST /Customers
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, phoneNumber, address, password, roles } =
    req.body
  console.log('data from cont/customer/createcustomer', firstName)
  try {
    const customer = new Customer({
      _id: uuidv4(),
      firstName,
      lastName,
      email,
      phoneNumber: Number(phoneNumber),
      address,
      password,
      roles,
    })
    // one way to check if email already registered
    // const emailCount = await Customer.countDocuments({ email })

    await CustomerService.create(customer)
    res.set('Access-Control-Allow-Origin', '*')
    res.json(customer)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error instanceof Error && error.message.indexOf('11000')) {
      res.status(409).json({
        status: 'duplicate email',
        statusCode: 409,
        message: `Email ${email} already registered`,
      })
      return
    } else {
      next(error)
    }
  }
}
