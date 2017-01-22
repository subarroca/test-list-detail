// ANGULAR
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';


// EXTERNAL
import { Observable, BehaviorSubject } from 'rxjs/Rx';


// OWN
import { environment } from '../../../environments/environment';
import { User } from './user';
import { Pagination } from '../../shared/pagination';



@Injectable()
export class UserService {
  listSubject: BehaviorSubject<{ pagination: Pagination, results: User[] }> =
  new BehaviorSubject<{ pagination: Pagination, results: User[] }>({ pagination: new Pagination, results: [] });
  list$: Observable<{ pagination: Pagination, results: User[] }> = Observable.from(this.listSubject);

  itemSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  item$: Observable<User> = Observable.from(this.itemSubject);



  constructor(
    private http: Http
  ) { }

  getUsers(page: number = 0, q: string = '') {
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('q', q);

    this.http.get(`${environment.server}/users`, {
      search: params
    })
      .map(info => this.parseResponse(info))
      .map(users => this.parseUsers(users))
      .first()
      .subscribe(users => this.listSubject.next(users));

    return this.list$;
  }

  getUser(id: number) {
    // this.getUsers()
    //   .filter(users => users.length > 0)
    //   .first()
    //   .subscribe(users => {
    //     this.itemSubject.next(users.find(user => user.id === id));
    //   });

    this.http.get(`${environment.server}/users/${id}`)
      .map(info => this.parseResponse(info))
      .map(user => new User(user))
      .first()
      .subscribe(user => this.itemSubject.next(user));

    return this.item$;
  }




  // parsers
  parseResponse(resp: Response) {
    return resp.json();
  }

  parseUsers(users) {
    return {
      pagination: new Pagination(users.pagination),
      results: users.results.map(user => new User(user))
    };
  }

}
