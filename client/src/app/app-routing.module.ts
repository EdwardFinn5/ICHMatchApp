import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'registerhome', component: RegisterHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
