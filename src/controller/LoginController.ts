import { Request, Response, NextFunction } from 'express'
import { get, controller, bodyValidator, post } from './decorators'
import { get as getRedis, set as setRedis } from '../db/redis'
import axios from 'axios'
import { User } from '../models/User'
import { SuccessModel } from '../models/SuccessModel'

function checkWechatLogin(req: Request, res: Response) {
  const code = req.params.code
  const appId = 'wxb5cde3ee4ee45929'
  const appSecret = 'ede8f9ff4b7f0816314bfb8c5c5da1d8'
  axios
    .get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: appId,
        secret: appSecret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    .then(async ({ data }) => {
      const { session_key, openid }: {session_key: string, openid: string} = data
      const { nickName, avatarUrl }: { nickName: string, avatarUrl: string } = req.body

      const checkLoginResult = await User.findOne({openid})
      const userId = `${Date.now()}_${Math.random()}`
      setRedis(userId, openid, 60 * 60 * 60 * 24 * 2) // 2天 过期

      if (!checkLoginResult) {
        // 第一次登录，sql 中没这个数据
        const insertLoginResult = await User.create({
          openid,
          nickName,
          avatarUrl
        })
        console.log('用户第一次登录，把数据存入 mongo')
        if (!insertLoginResult) {
          res.status(500).send('登录失败')
          return
        }
        res
        .header('Set-Cookie', `userId=${userId}`)
        .status(200)
        .send('第一次登录')
        return
      }
      console.log(checkLoginResult)
      res
        .header('Set-Cookie', `userId=${userId}`)
        .status(200)
        .send('登录成功')
    })
}

@controller('/auth')
class LoginController {
  @get('/launchCheck')
  launchCheck(req: Request, res: Response): void {
    const { userId } = req.cookies
    getRedis(userId).then((openid: string | null) => {
      if (openid) {
        // redis 中存了的情况
        console.log('这次登录成功是使用了 redis')

        const userId = `${Date.now()}_${Math.random()}`
        setRedis(userId, openid, 60 * 60 * 60 * 24 * 2) // 2天 过期
        res
          .header('Set-Cookie', `userId=${userId}`)
          .status(200)
          .send('登录成功')
        return
      }
      // redis 中没有，说明到期了
      console.log('redis 到期了，这次应该换userid')
      res.status(200).send('已过期')
    })
  }

  @post('/wxlogin/:code')
  @bodyValidator('avatarUrl', 'nickName')
  postLogin(req: Request, res: Response) {
    const { userId } = req.cookies

    if (!userId) {
      // 用户第一次授权微信登录
      // this.checkWechatLogin(req, res)
      checkWechatLogin(req, res)
      return
    }

    getRedis(userId).then(openid => {
      if (openid) {
        // redis 中存了的情况
        console.log('这次登录成功是使用了 redis')
        const userId = `${Date.now()}_${Math.random()}`
        setRedis(userId, openid, 60 * 60 * 60 * 24 * 2) // 2天 过期
        res
          .header('Set-Cookie', `userId=${userId}`)
          .status(200)
          .send('登录成功')
        return
      }
      // redis 中没有，说明到期了
      console.log('redis 到期了，这次应该换userid')
      // this.checkWechatLogin(req, res)
      checkWechatLogin(req, res)
    })
  }

  // checkWechatLogin(req: Request, res: Response) {
  //   const code = req.params.code
  //   const appId = 'wxb5cde3ee4ee45929'
  //   const appSecret = 'ede8f9ff4b7f0816314bfb8c5c5da1d8'
  //   axios
  //     .get('https://api.weixin.qq.com/sns/jscode2session', {
  //       params: {
  //         appid: appId,
  //         secret: appSecret,
  //         js_code: code,
  //         grant_type: 'authorization_code'
  //       }
  //     })
  //     .then(async ({ data }) => {
  //       const { session_key, openid }: {session_key: string, openid: string} = data
  //       const { nickName, avatarUrl }: { nickName: string, avatarUrl: string } = req.body

  //       const checkLoginResult = await User.findOne({openid})
  //       const userId = `${Date.now()}_${Math.random()}`
  //       setRedis(userId, openid, 1 * 60) // 1min 过期

  //       if (!checkLoginResult) {
  //         // 第一次登录，sql 中没这个数据
  //         const insertLoginResult = await User.create({
  //           openid,
  //           nickName,
  //           avatarUrl
  //         })
  //         console.log('用户第一次登录，把数据存入 mysql')
  //         if (!insertLoginResult) {
  //           res.status(500).send('登录失败')
  //           return
  //         }
  //       }
  //       res
  //         .header('Set-Cookie', `userId=${userId}`)
  //         .status(200)
  //         .send('登录成功')
  //     })
  // }
}
