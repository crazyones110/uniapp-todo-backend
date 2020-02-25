import { get, controller, use, post, put, del } from './decorators'
import { Request, Response, NextFunction } from 'express'
import { get as getRedis } from '../db/redis'
import { User } from '../models/User'
import { IMemo } from '../models/Memo'
import { RequestWithOpenid } from './decorators/use'
import { ITodo } from '../models/Todo'

async function requireAuth(
  req: RequestWithOpenid,
  res: Response,
  next: NextFunction
) {
  const userId: string = req.cookies.userId
  if (userId === undefined) {
    res.status(403).send('No Cookies')
    return
  }
  const openid = await getRedis(userId)
  if (openid !== null) {
    req.openid = openid
    next()
    return
  }
  res.status(403).send('Authentication Expires')
}

@controller('')
class TodoController {
  @get('/todo')
  @use(requireAuth)
  async getTodos(req: RequestWithOpenid, res: Response) {
    const user = await User.findOne({ openid: req.openid })
    res.status(200).send(user?.todo)
  }

  @post('/todo')
  @use(requireAuth)
  async addTodo(req: RequestWithOpenid, res: Response) {
    const newTodo: ITodo = req.body
    console.log('req.openid', req.openid)

    User.findOneAndUpdate(
      {
        openid: req.openid
      },
      {
        $push: {
          todo: newTodo
        }
      },
      { upsert: true },
      (err, result) => {
        if (err) {
          res.status(500).send('Insert Error')
          return
        }
        res.status(200).send('Insert Success')
      }
    )
  }

  @put('/todo')
  @use(requireAuth)
  updateTodo(req: RequestWithOpenid, res: Response) {
    User.findOneAndUpdate({
      openid: req.openid,
      'todo.createTime': req.body.createTime
    }, {
      $set: {
        'todo.$': req.body
      }
    }, (err, value) => {
      if (err) {
        res.status(500).send('Update Error')
        return
      }
      res.status(200).send('Update Success')
    })
  }

  @del('/todo')
  @use(requireAuth)
  deleteTodo(req: RequestWithOpenid, res: Response) {
    User.findOneAndUpdate({
      openid: req.openid
    }, {
      $pull: {
        todo: {
          createTime: req.body.createTime
        }
      }
    }, (err, result) => {
      if (err) {
        res.status(500).send('Delete Error')
        return
      }
      res.status(200).send('Delete Success')
    })
  }
}

@controller('')
class MemoController {
  @get('/memo')
  @use(requireAuth)
  async getMemos(req: RequestWithOpenid, res: Response) {
    const user = await User.findOne({ openid: req.openid })
    res.status(200).send(user?.memo)
  }

  @post('/memo')
  @use(requireAuth)
  async addMemo(req: RequestWithOpenid, res: Response) {
    const newMemo: IMemo = req.body
    console.log('req.openid', req.openid)

    User.findOneAndUpdate(
      {
        openid: req.openid
      },
      {
        $push: {
          memo: newMemo
        }
      },
      { upsert: true },
      (err, result) => {
        if (err) {
          res.status(500).send('Insert Error')
          return
        }
        res.status(200).send('插入成功')
      }
    )
  }

  @put('/memo')
  @use(requireAuth)
  updateMemo(req: RequestWithOpenid, res: Response) {
    User.findOneAndUpdate({
      openid: req.openid,
      'memo.createTime': req.body.createTime
    }, {
      $set: {
        'memo.$': req.body
      }
    }, (err, value) => {
      if (err) {
        res.status(500).send('Update Error')
        return
      }
      res.status(200).send('Update Success')
    })
  }
}
