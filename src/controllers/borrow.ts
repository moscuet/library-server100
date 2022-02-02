import { Request, Response, NextFunction } from 'express'

import Borrow from '../models/Borrow'
import BorrowService from '../services/borrow'
import { BadRequestError } from '../helpers/apiError'

// POST /borrows
export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId, customerId, borrowDate, returnDate } = req.body

    const borrow = new Borrow({
      customerId,
      bookId,
      borrowDate,
      returnDate,
      isReturned: false,
    })

    await BorrowService.create(borrow)
    res.json(borrow)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /borrws/:borrowId
export const updateBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const borrowId = req.params.borrowId
    const updatedBorrow = await BorrowService.update(borrowId, update)
    res.json(updatedBorrow)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//##################

// DELETE /borrows/:borrowId
export const deleteBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BorrowService.deleteBorrow(req.params.borrowId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /borrows/:borrowId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BorrowService.findById(req.params.borrowId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /borrows
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params: string = req.query.customerId as string
  console.log('param customerId: ', params)
  if (!params) {
    console.log('customerId is undefined')

    try {
      res.json(await BorrowService.findAll())
    } catch (error) {
      console.log('error')
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
    }
  } else {
    try {
      res.json(await BorrowService.findByCustomerId(params))
    } catch (error) {
      console.log('error')
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
    }
  }
}

// Delete All Borrow

export const deleteAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BorrowService.deleteAll()
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
