import mongoose, { Schema, Document } from 'mongoose'
import { MemoSchema, IMemo } from './Memo'
import { TodoSchema, ITodo } from './Todo'

export interface IUser extends Document {
  openid: string,
  nickName?: string,
  avatarUrl?: string,
  memo: IMemo[],
  todo: ITodo[]
}

const UserSchema = new Schema({
  openid: {
    type: String,
    required: true
  },
  nickName: String,
  avatarUrl: String,
  memo: [MemoSchema],
  todo: [TodoSchema]
})

export const User = mongoose.model<IUser>('User', UserSchema)



