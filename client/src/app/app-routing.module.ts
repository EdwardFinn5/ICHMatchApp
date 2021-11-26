import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EmpmemberDetailComponent } from './empmembers/empmember-detail/empmember-detail.component';
import { EmpmemberEditCardnlogoComponent } from './empmembers/empmember-edit-cardnlogo/empmember-edit-cardnlogo.component';
import { EmpmemberEditEmpinfoComponent } from './empmembers/empmember-edit-empinfo/empmember-edit-empinfo.component';
import { EmpmemberEditPositionComponent } from './empmembers/empmember-edit-position/empmember-edit-position.component';
import { EmpmemberListComponent } from './empmembers/empmember-list/empmember-list.component';
import { EmpmemberSearchComponent } from './empmembers/empmember-search/empmember-search.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditCardnphotoComponent } from './members/member-edit-cardnphoto/member-edit-cardnphoto.component';
import { MemberEditStudinfoComponent } from './members/member-edit-studinfo/member-edit-studinfo.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberSearchComponent } from './members/member-search/member-search.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RegisterStudComponent } from './register-stud/register-stud.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedEmpmemberCardChangesGuard } from './_guards/prevent-unsaved-empmember-card-changes.guard';
import { PreventUnsavedEmpmemberCardEmpInfoChangesGuard } from './_guards/prevent-unsaved-empmember-card-emp-info-changes.guard';
import { PreventUnsavedMemberCardChangesGuard } from './_guards/prevent-unsaved-member-card-changes.guard';
import { PreventUnsavedMemberStudInfoChangesGuard } from './_guards/prevent-unsaved-member-stud-info-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'registerhome', component: RegisterHomeComponent },
  { path: 'registeremp', component: RegisterEmpComponent },
  { path: 'registerstud', component: RegisterStudComponent },
  { path: 'memberslist', component: MemberListComponent },
  { path: 'empmemberslist', component: EmpmemberListComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'membersearch', component: MemberSearchComponent },
      { path: 'empmembersearch', component: EmpmemberSearchComponent },
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'members/:id', component: MemberDetailComponent },
      {
        path: 'member/edit',
        component: MemberEditCardnphotoComponent,
        canDeactivate: [PreventUnsavedMemberCardChangesGuard],
      },
      {
        path: 'academic/edit',
        component: MemberEditStudinfoComponent,
        canDeactivate: [PreventUnsavedMemberStudInfoChangesGuard],
      },
      { path: 'empmembers/:username', component: EmpmemberDetailComponent },
      {
        path: 'empmember/edit',
        component: EmpmemberEditCardnlogoComponent,
        canDeactivate: [PreventUnsavedEmpmemberCardChangesGuard],
      },
      {
        path: 'company/edit',
        component: EmpmemberEditEmpinfoComponent,
        canDeactivate: [PreventUnsavedEmpmemberCardEmpInfoChangesGuard],
      },
      { path: 'position/edit', component: EmpmemberEditPositionComponent },
    ],
  },
  { path: 'lists', component: ListsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
