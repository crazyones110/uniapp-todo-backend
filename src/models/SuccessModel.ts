interface returnData {
  memoCount?: number,
  todoCount?: number
}

export class SuccessModel {
  constructor(public msg: string, public data: returnData) {}
}