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



  constructor(
    private http: Http
  ) { }

  getUsers(page = 0, q = '') {
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('q', q);

    this.http
      .get(`${environment.server}/users`, {
        search: params
      })
      .map(info => this.parseResponse(info))
      .map(users => this.parseUsers(users))
      .first()
      .subscribe(users => this.listSubject.next(users));

    return this.list$;
  }

  getUser(id: number) {
    return this.http
      .get(`${environment.server}/users/${id}`)
      .map(info => this.parseResponse(info))
      .map(user => new User(user))
      .first();
  }

  clearList() {
    this.listSubject.next({
      pagination: new Pagination(),
      results: []
    });
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
