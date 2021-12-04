import mongoose, { Document } from 'mongoose'

export type TRole = Document & {
  nsme: string
}

const roleSchema = new mongoose.Schema({
  name: String,
})

export default mongoose.model<TRole>('Role', roleSchema)
