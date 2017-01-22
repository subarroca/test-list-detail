// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// EXTERNAL


// OWN
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { userRouting } from './users.routes';
import { UserService } from './shared/user.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    userRouting
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
