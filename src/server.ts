import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
import { Mongoose } from 'mongoose'
import app from './app'
import { MONGODB_URI } from './util/secrets'

const mongoUrl = MONGODB_URI

mongoose
  .connect(mongoUrl, {
    autoIndex: true,
  })
  .then(() => {
    // Start Express server
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

app.use(errorHandler())
