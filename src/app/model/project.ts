export class Project {

  constructor(private readonly _title: string, private readonly _id: string = null) {
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }
}
