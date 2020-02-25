import express from 'express'

export class AppRouter {
  private static Instance: express.Router;

  static get instance(): express.Router {
    if (!AppRouter.Instance) {
      AppRouter.Instance = express.Router()
    }
    return AppRouter.Instance
  }
}