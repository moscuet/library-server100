import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

import crypto from 'crypto'
import bcrypt from 'bcrypt'
import bcryptConfig from '../config/bcrypt'
import authConfig from '../config/auth'

import jwt from 'jsonwebtoken'
import { TCustomer } from '../models/Customer'
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

  try {
    const customer = await Customer.findOne({ useremail }).exec()
    //console.log('response customer/signin', customer)
    const pass = customer ? customer.password : ''
    const isValidPassword = await bcrypt.compare(password, pass)
    if (!useremail || !password)
      return res.status(400).json({ message: 'please fillup all data' })
    if (!customer) return res.status(401).json({ message: 'wrong credential' })
    if (!isValidPassword)
      return res.status(401).json({ message: 'Email or Password is Wrong!' })

    const accessToken = jwt.sign(
      { id: customer.useremail },
      authConfig.secret,
      {
        expiresIn: 7200,
      }
    )

    const resObj = {
      _id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      useremail: customer.useremail,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
      password: customer.password,
      roles: customer.roles,
      accessToken,
    }
    res.status(200).send(resObj)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error instanceof Error && error.message.indexOf('11000')) {
      res.status(401).json({
        status: 'duplicate email',
        statusCode: 401,
        message: `Email ${useremail} already registered`,
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
  const {
    firstName,
    lastName,
    useremail,
    phoneNumber,
    address,
    password,
    roles,
  } = req.body
  console.log('data from cont/auth/signup', firstName)
  try {
    const customer = new Customer({
      _id: uuidv4(),
      firstName,
      lastName,
      useremail,
      phoneNumber: Number(phoneNumber),
      address,
      password: await bcrypt.hash(password, bcryptConfig.salt),
      roles,
    })
    console.log('customer from cont/authentication/signup', customer)
    // one way to check if email already registered: await User.findOne({ email }).exec() === true;

    //await CustomerService.create(customer)
    await customer.save()
    res.set('Access-Control-Allow-Origin', '*')
    res.json(customer)
    console.log('closing signup')
  } catch (error) {
    console.log('signup error')
    if (error instanceof Error && error.name == 'ValidationError') {
      console.log('signup error', error.message)
      next(new BadRequestError('Invalid Request', error))
    } else if (error instanceof Error && error.message.indexOf('11000')) {
      res.status(401).json({
        status: 'duplicate email',
        statusCode: 401,
        message: `Email ${useremail} already registered`,
      })
      return
    } else {
      next(error)
    }
  }
}
