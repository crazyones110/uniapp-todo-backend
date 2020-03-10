interface returnData {
  memoCount?: number,
  todoCount?: number,
  restTodoCount?: number,
  nickName?: string,
  avatarUrl?: string
}

export class SuccessModel {
  constructor(public msg: string, public data?: returnData) {}
}