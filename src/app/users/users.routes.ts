// ANGULAR
import { RouterModule, Routes } from '@angular/router';


// EXTERNAL


// OWN
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';


const userRoutes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: '',
    component: UsersComponent
  }
];

export const userRouting = RouterModule.forRoot(userRoutes);
