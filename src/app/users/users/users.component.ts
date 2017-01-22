// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


// EXTERNAL
import { Subscription } from 'rxjs/Rx';


// OWN
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { fade } from '../../shared/fade.animation';


@Component({
  selector: 'kw-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fade]
})
export class UsersComponent implements OnInit, OnDestroy {
  private users: User[];

  private filteredUsers: User[];
  private usersPage: User[];


  // Form vars
  private queryControl: FormControl = new FormControl();

  private filterForm: FormGroup = new FormGroup({
    query: this.queryControl
  });

  private filterForm$$: Subscription;
  private users$$: Subscription;


  // Pagination
  private pageSize: number = 25;
  private pageNumber: number = 1;
  private pageTotal: number = 1;
  private pageArray: number[];




  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // get user list
    this.users$$ = this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.filteredUsers = users;
        this.loadPage(1);
      });

    // on any change in form parse filtering again
    this.filterForm$$ = this.filterForm.valueChanges
      .subscribe(changes => {
        this.filteredUsers = this.users.filter(user => {
          return user.match(changes);
        });
        this.loadPage(1);
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
    this.pageNumber = pageNumber;
    this.usersPage = this.filteredUsers.slice((pageNumber - 1) * this.pageSize, pageNumber * this.pageSize);
    this.pageTotal = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.pageArray = Array(this.pageTotal);
  }

}
