export class Create extends Response {
  constructor(readonly status: number) {
    super();
    this.status = status;
  }
}
