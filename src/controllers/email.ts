import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { BadRequestError } from '../helpers/apiError'

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, subject, message } = req.body

    // Validation
    if (
      typeof email !== 'string' ||
      typeof name !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      throw new BadRequestError('Invalid input')
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_APP_PASSWORD,
      },
    })

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: subject,
      text: `From: ${name} message: ${message}`,
    }

    await transport.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.error('Error sending email:', error)
      next(new BadRequestError('Failed to send email', error))
    }
  }
}
