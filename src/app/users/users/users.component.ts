// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


// EXTERNAL
import { Subscription } from 'rxjs/Rx';


// OWN
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { fade } from '../../shared/fade.animation';
import { Pagination } from '../../shared/pagination';


@Component({
  selector: 'kw-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fade]
})
export class UsersComponent implements OnInit, OnDestroy {
  private users: User[];
  private loading: boolean;

  // Form vars
  private queryControl: FormControl = new FormControl();
  private debounceMs: number = 300;

  private filterForm: FormGroup = new FormGroup({
    query: this.queryControl
  });

  private filterForm$$: Subscription;
  private users$$: Subscription;


  // Pagination
  private pagination: Pagination;
  private pageArray: number[];




  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // get user list
    this.loading = true;
    this.users$$ = this.userService.getUsers()
      .do(() => {
        this.loading = false
      })
      .subscribe(users => {
        this.users = users.results;
        this.pagination = users.pagination;
        this.pageArray = this.getPaginationArray();
      });

    // on any change in form parse filtering again
    this.filterForm$$ = this.filterForm.valueChanges
      .debounceTime(this.debounceMs)
      .distinctUntilChanged()
      .subscribe(changes => {
        console.log(changes);
        this.loadPage(0);
      });
  }

  // dispose of observables to improve performance
  ngOnDestroy() {
    if (this.filterForm$$) {
      this.filterForm$$.unsubscribe();
    }
    if (this.users$$) {
      this.users$$.unsubscribe();
    }
  }


  loadPage(pageNumber: number) {
    this.loading = true;
    this.userService.getUsers(pageNumber, this.queryControl.value);
  }

  getPaginationArray() {
    if (this.pagination && this.pagination.pageSize) {
      return Array(Math.ceil(this.pagination.totalItems / this.pagination.pageSize));
    } else {
      return [];
    }
  }


  clearQuery() {
    this.queryControl.reset();
  }

}
