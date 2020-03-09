interface returnData {
  memoCount?: number,
  todoCount?: number,
  restTodoCount?: number
}

export class SuccessModel {
  constructor(public msg: string, public data: returnData) {}
}