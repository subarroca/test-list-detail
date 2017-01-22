export class User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthday: string;

  constructor(options: {
    id?: number,
    name?: string,
    surname?: string,
    email?: string,
    phone?: string,
    birthday?: string,
  } = {}) {
    this.id = options.id;
    this.name = options.name;
    this.surname = options.surname;
    this.email = options.email;
    this.phone = options.phone;
    this.birthday = options.birthday;
  }

  match(filter) {
    if (filter.query) {
      let query = filter.query.toLowerCase();
      return ((this.name.toLowerCase().search(query) > -1)
        || (this.surname.toLowerCase().search(query) > -1));

    } else {
      return true;
    }
  }

  get fullName(){
    return `${this.name} ${this.surname}`;
  }
}
