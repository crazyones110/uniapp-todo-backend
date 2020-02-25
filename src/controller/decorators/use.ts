import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler, NextFunction, Request, Response } from 'express'

export interface RequestWithOpenid extends Request {
  openid?: string
}

// export function use(middleware: RequestHandler) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     const middlewares =
//       Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

//     middlewares.push(middleware)

//     Reflect.defineMetadata(
//       MetadataKeys.middleware,
//       [...middlewares, middleware],
//       target,
//       key
//     )
//   }
// }
export function use(
  middleware: (
    req: Request | RequestWithOpenid,
    res: Response,
    next: NextFunction
  ) => any
) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

    middlewares.push(middleware)

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    )
  }
}
