import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EmpmemberDetailComponent } from './empmembers/empmember-detail/empmember-detail.component';
import { EmpmemberListComponent } from './empmembers/empmember-list/empmember-list.component';
import { EmpmemberSearchComponent } from './empmembers/empmember-search/empmember-search.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberSearchComponent } from './members/member-search/member-search.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RegisterStudComponent } from './register-stud/register-stud.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'registerhome', component: RegisterHomeComponent },
  { path: 'registeremp', component: RegisterEmpComponent },
  { path: 'registerstud', component: RegisterStudComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'members/:id', component: MemberDetailComponent },
  { path: 'empmembers', component: EmpmemberListComponent },
  { path: 'empmembers/:id', component: EmpmemberDetailComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'membersearch', component: MemberSearchComponent },
      { path: 'empmembersearch', component: EmpmemberSearchComponent },
    ],
  },
  { path: 'lists', component: ListsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
