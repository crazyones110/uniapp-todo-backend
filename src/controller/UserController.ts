import { IUser, User } from '../models/User'

class UserController {
  checkExist(openid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      User.find({openid}).then(users => {
        if (users.length === 0) {
          resolve('none')
          return
        }
        if (users.length) {
          resolve('exist')
        }
      })
    })
  }
}