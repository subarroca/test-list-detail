// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';


// EXTERNAL
import { Subscription } from 'rxjs/Rx';


// OWN
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { fade } from '../../shared/fade.animation';


@Component({
  selector: 'kw-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fade]
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  loading: boolean;

  user$$: Subscription;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    // this could be done with async pipe but then it gets called multiple times
    this.user$$ = this.activatedRoute.params
      .filter(params => params['id'])
      .do(() => this.loading = true)
      .switchMap(params =>
        this.userService
          .getUser(parseInt(params['id']))
      )
      .do(() => this.loading = false)
      .subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['../../users'], { relativeTo: this.activatedRoute });
          this.snackBar.open('User not found', null, {
            duration: 3000
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.user$$) {
      this.user$$.unsubscribe();
    }
  }

}
