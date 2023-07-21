export class Categories {
  public get categoryName(): string {
    return this._categoryName;
  }
  public set categoryName(value: string) {
    this._categoryName = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  constructor(
    private _id: number,
    private _categoryName: string,
  ){}
}
