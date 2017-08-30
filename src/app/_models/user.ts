
export class User {
    _id: number;
    email: string;
    password: string;
    name: string;

    constructor()
    {
      this._id = Date.now();
      this.email = '';
      this.password = '';
      this.name = '';
    }
}
