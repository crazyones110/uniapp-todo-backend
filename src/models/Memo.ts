import mongoose, { Document, Schema } from 'mongoose'

enum Category {
  personal = 'personal',
  life = 'life',
  work = 'work'
}

export interface IMemo extends Document {
  content: string,
  category?: Category,
  createTime: number
}

export const MemoSchema = new Schema({
  createTime: {
    type: Number,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  category: ['personal', 'life', 'work']

})


