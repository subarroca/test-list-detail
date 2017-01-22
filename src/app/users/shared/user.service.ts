// ANGULAR
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


// EXTERNAL
import { Observable, BehaviorSubject } from 'rxjs/Rx';


// OWN
import { environment } from '../../../environments/environment';
import { User } from './user';



@Injectable()
export class UserService {
  listSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  list$: Observable<User[]> = Observable.from(this.listSubject);

  itemSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  item$: Observable<User> = Observable.from(this.itemSubject);



  constructor(
    private http: Http
  ) {  }

  getUsers() {
    // only if we have no users loaded get the list
    if (this.listSubject.getValue().length === 0) {
      this.http.get(environment.usersUrl)
        .map(info => this.parseResponse(info))
        .map(users => this.parseUsers(users))
        .first()
        .subscribe(users => this.listSubject.next(users));
    }

    return this.list$;
  }

  getUser(id: number) {
    this.getUsers()
      .filter(users => users.length > 0)
      .first()
      .subscribe(users => {
        this.itemSubject.next(users.find(user => user.id === id));
      });

    return this.item$;
  }




  // parsers
  parseResponse(resp: Response) {
    return resp.json();
  }

  parseUsers(users) {
    return users.map(user => new User(user));
  }

}
