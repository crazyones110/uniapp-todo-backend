import mongoose, { Schema, Document } from 'mongoose'

enum Category {
  personal = 'personal',
  life = 'life',
  work = 'work'
}

export interface ITodo extends Document {
  content?: string,
  category?: Category,
  createTime: number,
  checked?: boolean,
  deleted?: boolean
}

export const TodoSchema: Schema = new Schema({
  content: {
    type: String
  },
  category: String,
  createTime: {
    type: Number,
    required: true
  },
  checked: Boolean,
  deleted: Boolean
})

