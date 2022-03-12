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
import { AddStudInfoComponent } from './studinfos/add-stud-info/add-stud-info.component';
import { PreventUnsavedAddStudInfoChangesGuard } from './_guards/prevent-unsaved-add-stud-info-changes.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedEmpmemberCardChangesGuard } from './_guards/prevent-unsaved-empmember-card-changes.guard';
import { PreventUnsavedEmpmemberCardEmpInfoChangesGuard } from './_guards/prevent-unsaved-empmember-card-emp-info-changes.guard';
import { PreventUnsavedMemberCardChangesGuard } from './_guards/prevent-unsaved-member-card-changes.guard';
import { PreventUnsavedMemberStudInfoChangesGuard } from './_guards/prevent-unsaved-member-stud-info-changes.guard';
import { AddPositionComponent } from './positions/add-position/add-position.component';
import { PreventUnsavedAddPositionChangesGuard } from './_guards/prevent-unsaved-add-position-changes.guard';
import { EmpmemberPositionsComponent } from './empmembers/empmember-positions/empmember-positions.component';
import { EditPositionComponent } from './positions/edit-position/edit-position.component';
import { PreventUnsavedEditPositionChangesGuard } from './_guards/prevent-unsaved-edit-position-changes.guard';
import { PositionsListComponent } from './positions/positions-list.component';
import { PositionDetailComponent } from './positions/position-detail.component';
import { PositionDetailNewComponent } from './positions/position-detail-new.component';
import { Empmember2EditEmpinfoComponent } from './empmembers/empmember2-edit-empinfo.component';
import { EmpmemberCompDetailComponent } from './empmembers/empmember-comp-detail/empmember-comp-detail.component';
import { EmpmemberThumbsupDetailComponent } from './empmembers/empmember-thumbsup-detail/empmember-thumbsup-detail.component';
import { MemberThumbsupDetailComponent } from './members/member-thumbsup-detail/member-thumbsup-detail.component';
import { EmpmemberMessageDetailComponent } from './empmembers/empmember-message-detail/empmember-message-detail.component';
import { EmpmemberSuperDetailComponent } from './empmembers/empmember-super-detail/empmember-super-detail.component';
import { EmpmemberListSuperComponent } from './empmembers/empmember-list-super/empmember-list-super.component';
import { PositionDetailEmployerComponent } from './positions/position-detail-employer/position-detail-employer.component';
import { PositionDetailThumbsupComponent } from './positions/position-detail-thumbsup/position-detail-thumbsup.component';
import { PositionDetailmessageComponent } from './positions/position-detailmessage/position-detailmessage.component';
import { MemberMessageDetailComponent } from './members/member-message-detail/member-message-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'registerhome', component: RegisterHomeComponent },
  { path: 'registeremp', component: RegisterEmpComponent },
  { path: 'registerstud', component: RegisterStudComponent },
  { path: 'memberslist', component: MemberListComponent },
  { path: 'empmemberslist', component: EmpmemberListComponent },
  { path: 'empmemberslistsuper', component: EmpmemberListSuperComponent },
  {
    path: 'empmembercompdetail/:appUserId',
    component: EmpmemberCompDetailComponent,
  },
  {
    path: 'empmembersuperdetail/:appUserId',
    component: EmpmemberSuperDetailComponent,
  },
  {
    path: 'empmembermessagedetail/:appUserId',
    component: EmpmemberMessageDetailComponent,
  },
  {
    path: 'empmemberthumbsupdetail/:appUserId',
    component: EmpmemberThumbsupDetailComponent,
  },
  {
    path: 'memberthumbsupdetail/:appUserId',
    component: MemberThumbsupDetailComponent,
  },
  {
    path: 'membermessagedetail/:username',
    component: MemberMessageDetailComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'membersearch',
        component: MemberSearchComponent,
        pathMatch: 'full',
      },
      { path: 'empmember/positions', component: EmpmemberPositionsComponent },
      {
        path: 'empmembersearch',
        component: EmpmemberSearchComponent,
        pathMatch: 'full',
      },
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'members/:id', component: MemberDetailComponent },
      {
        path: 'member/edit',
        component: MemberEditCardnphotoComponent,
        canDeactivate: [PreventUnsavedMemberCardChangesGuard],
      },
      {
        path: 'studinfo/edit',
        component: MemberEditStudinfoComponent,
        canDeactivate: [PreventUnsavedMemberStudInfoChangesGuard],
      },
      {
        path: 'position/add',
        component: AddPositionComponent,
        canDeactivate: [PreventUnsavedAddPositionChangesGuard],
      },
      { path: 'empmembers/:username', component: EmpmemberDetailComponent },
      {
        path: 'empmember/edit',
        component: EmpmemberEditCardnlogoComponent,
        canDeactivate: [PreventUnsavedEmpmemberCardChangesGuard],
      },
      {
        path: 'company2/edit',
        component: Empmember2EditEmpinfoComponent,
        pathMatch: 'full',
        canDeactivate: [PreventUnsavedEmpmemberCardEmpInfoChangesGuard],
      },
      {
        path: 'positionslist',
        component: PositionsListComponent,
        pathMatch: 'full',
      },
      {
        path: 'studinfo/add',
        component: AddStudInfoComponent,
        canDeactivate: [PreventUnsavedAddStudInfoChangesGuard],
      },
    ],
  },
  { path: 'lists', component: ListsComponent },
  { path: 'messages', component: MessagesComponent },
  {
    path: 'detailofposition/:positionId',
    component: PositionDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'newpositiondetail/:positionId',
    component: PositionDetailNewComponent,
    pathMatch: 'full',
  },
  {
    path: 'employerpositiondetail/:positionId',
    component: PositionDetailEmployerComponent,
    pathMatch: 'full',
  },
  {
    path: 'thumbsuppositiondetail/:positionId',
    component: PositionDetailThumbsupComponent,
    pathMatch: 'full',
  },
  {
    path: 'messagepositiondetail/:positionId',
    component: PositionDetailmessageComponent,
    pathMatch: 'full',
  },
  {
    path: 'editposition/:positionId',
    component: EditPositionComponent,
    pathMatch: 'full',
  },
  { path: 'about', component: AboutComponent },
  // { path: 'positionslist', component: PositionsListComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'company/edit', component: EmpmemberEditEmpinfoComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
