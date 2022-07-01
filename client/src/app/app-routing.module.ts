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
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { PositionDutyBulletsComponent } from './position-duty-bullets/position-duty-bullets.component';
import { PositionBulletResolver } from './_resolvers/position-bullet.Resolver';
import { PositionViewDutyBulletsComponent } from './position-duty-bullets/position-view-duty-bullets.component';
import { PositionEditDutyBulletsComponent } from './position-duty-bullets/position-edit-duty-bullets.component';
import { PositionSkillsBulletsComponent } from './position-skills-bullets/position-skills-bullets.component';
import { PositionViewSkillsBulletsComponent } from './position-skills-bullets/position-view-skills-bullets.component';
import { PositionEditSkillsBulletsComponent } from './position-skills-bullets/position-edit-skills-bullets.component';
import { PositionBulletsHomeComponent } from './position-duty-bullets/position-bullets-home.component';
import { EditNewPositionComponent } from './positions/edit-new-position.component';
import { EditNew2PositionComponent } from './positions/edit-new2-position.component';
import { MemberListSearchComponent } from './members/member-list-search/member-list-search.component';
import { CategoryListComponent } from './categories-and-majors/category-list/category-list.component';
import { CategoryEditComponent } from './categories-and-majors/category-edit/category-edit.component';
import { MajorEditComponent } from './categories-and-majors/major-edit/major-edit.component';
import { AddMajorsComponent } from './categories-and-majors/add-majors/add-majors.component';
import { PoscategoryEditComponent } from './poscategories-and-positnames/poscategory-edit/poscategory-edit.component';
import { AddPositnameComponent } from './poscategories-and-positnames/add-positname/add-positname.component';
import { PositnameEditComponent } from './poscategories-and-positnames/positname-edit/positname-edit.component';
import { PoscategoryListComponent } from './poscategories-and-positnames/poscategory-list/poscategory-list.component';
import { ProfileadviceListComponent } from './profileAdvices/profileadvice-list/profileadvice-list.component';
import { ProfileadviceEditComponent } from './profileAdvices/profileadvice-edit/profileadvice-edit.component';
import { ProfileadviceNewListComponent } from './profileAdvices/profileadvice-new-list/profileadvice-new-list.component';
import { PreregisterStudComponent } from './register-stud/preregister-stud.component';
import { RegisterCodeListComponent } from './registerCodes/register-code-list/register-code-list.component';
import { RegisterCodeEditComponent } from './registerCodes/register-code-edit/register-code-edit.component';
import { Step1RegisterStudComponent } from './register-stud/step1-register-stud.component';
import { CategoryListStudentsComponent } from './categories-and-majors/category-list/category-list-students.component';
import { AddMajorsStudentsComponent } from './categories-and-majors/add-majors/add-majors-students.component';
import { LocationListComponent } from './locations/location-list.component';
import { AddStlocationsComponent } from './locations/add-stlocations.component';
import { AddCilocationsComponent } from './locations/add-cilocations.component';
import { ColocationEditComponent } from './locations/colocation-edit.component';
import { StlocationEditComponent } from './locations/stlocation-edit.component';
import { CilocationEditComponent } from './locations/cilocation-edit.component';
import { LocationListStudentsComponent } from './locations/location-list-students.component';
import { AddStlocationsStudentsComponent } from './locations/add-stlocations-students.component';
import { AddCilocationsStudentsComponent } from './locations/add-cilocations-students.component';
import { PreregisterEmpComponent } from './register-emp/preregister-emp.component';
import { Step1RegisterEmpComponent } from './register-emp/step1-register-emp.component';
import { EmpindustryEditComponent } from './empindustries/empindustry-edit.component';
import { EmpindustryListComponent } from './empindustries/empindustry-list.component';
import { EmpindustryListEmpsComponent } from './empindustries/empindustry-list-emps.component';
import { StemplocationListComponent } from './emplocations/stemplocation-list.component';
import { AddCiemplocationsComponent } from './emplocations/add-ciemplocations.component';
import { StemplocationEditComponent } from './emplocations/stemplocation-edit.component';
import { CiemplocationEditComponent } from './emplocations/ciemplocation-edit.component';
import { AddCiemplocationsEmpsComponent } from './emplocations/add-ciemplocations-emps.component';
import { StemplocationListEmpsComponent } from './emplocations/stemplocation-list-emps.component';
import { PoscategoriesListEmpsComponent } from './poscategories-and-positnames/poscategories-list-emps.component';
import { AddPositnamesEmpsComponent } from './poscategories-and-positnames/add-positnames-emps.component';
import { EditNew2PrepositionComponent } from './positions/edit-new2-preposition/edit-new2-preposition.component';
import { Edit2PositionComponent } from './positions/edit2-position.component';
import { PositionDetailNewEmpsComponent } from './positions/position-detail-new-emps.component';
import { PositionaAcBulletsComponent } from './positiona-ac-bullets/positiona-ac-bullets.component';
import { PositionaWorkBulletsComponent } from './positiona-work-bullets/positiona-work-bullets.component';
import { PositionaEditAcBulletsComponent } from './positiona-ac-bullets/positiona-edit-ac-bullets.component';
import { MemberDetailStudentComponent } from './members/member-detail-student.component';
import { PositionaEditWorkBulletsComponent } from './positiona-work-bullets/positiona-edit-work-bullets.component';
import { CollegeListComponent } from './colleges/college-list.component';
import { CollegeEditComponent } from './colleges/college-edit.component';
import { AddNewsComponent } from './news/add-news.component';
import { ListNewsComponent } from './news/list-news.component';
import { EditNewsComponent } from './news/edit-news.component';
import { DetailNewsComponent } from './news/detail-news.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'registerhome', component: RegisterHomeComponent },
  { path: 'registeremp', component: RegisterEmpComponent },
  { path: 'registerstud', component: RegisterStudComponent, pathMatch: 'full' },
  {
    path: 'step1registerstud',
    component: Step1RegisterStudComponent,
    pathMatch: 'full',
  },
  {
    path: 'step1registeremp',
    component: Step1RegisterEmpComponent,
    pathMatch: 'full',
  },
  {
    path: 'preregisterstud',
    component: PreregisterStudComponent,
    pathMatch: 'full',
  },
  {
    path: 'preregisteremp',
    component: PreregisterEmpComponent,
    pathMatch: 'full',
  },
  { path: 'memberslist', component: MemberListComponent },
  { path: 'empmemberslist', component: EmpmemberListComponent },
  { path: 'empmemberslistsuper', component: EmpmemberListSuperComponent },
  {
    path: 'addmajors/:categoryId',
    component: AddMajorsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addstlocations/:coLocationId',
    component: AddStlocationsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addciemplocations/:stempLocationId',
    component: AddCiemplocationsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addcilocations/:stLocationId',
    component: AddCilocationsComponent,
    pathMatch: 'full',
  },
  {
    path: 'locationlist',
    component: LocationListComponent,
    pathMatch: 'full',
  },
  {
    path: 'emplocationlist',
    component: StemplocationListComponent,
    pathMatch: 'full',
  },
  {
    path: 'emplocationlistemps',
    component: StemplocationListEmpsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addmajorsstudents/:categoryId',
    component: AddMajorsStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addstlocationsstudents/:coLocationId',
    component: AddStlocationsStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addcilocationsstudents/:stLocationId',
    component: AddCilocationsStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addciemplocationsemps/:stempLocationId',
    component: AddCiemplocationsEmpsComponent,
    pathMatch: 'full',
  },
  {
    path: 'addpositnames/:posCategoryId',
    component: AddPositnameComponent,
    pathMatch: 'full',
  },
  {
    path: 'addpositnamesemps/:posCategoryId',
    component: AddPositnamesEmpsComponent,
    pathMatch: 'full',
  },

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
    path: 'empindustrylistemps',
    component: EmpindustryListEmpsComponent,
    pathMatch: 'full',
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
      {
        path: 'categoryedit/:categoryId',
        component: CategoryEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'empindustryedit/:empIndustryId',
        component: EmpindustryEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'empindustrylist',
        component: EmpindustryListComponent,
        pathMatch: 'full',
      },

      {
        path: 'colocationedit/:coLocationId',
        component: ColocationEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'stlocationedit/:stLocationId',
        component: StlocationEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'stemplocationedit/:stempLocationId',
        component: StemplocationEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'cilocationedit/:ciLocationId',
        component: CilocationEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'ciemplocationedit/:ciempLocationId',
        component: CiemplocationEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'profileadvicelist',
        component: ProfileadviceListComponent,
        pathMatch: 'full',
      },
      {
        path: 'profileadvicenewlist',
        component: ProfileadviceNewListComponent,
        pathMatch: 'full',
      },
      {
        path: 'profileadviceedit/:profileAdviceId',
        component: ProfileadviceEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'registercodelist',
        component: RegisterCodeListComponent,
        pathMatch: 'full',
      },
      {
        path: 'registercodeedit/:registerCodeId',
        component: RegisterCodeEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'poscategoryedit/:posCategoryId',
        component: PoscategoryEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'poscategoryedit/:posCategoryId',
        component: PoscategoryEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'majoredit/:majorId',
        component: MajorEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'positnameedit/:positNameId',
        component: PositnameEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'memberlistsearch',
        component: MemberListSearchComponent,
        pathMatch: 'full',
      },
      {
        path: 'empmember/positions',
        component: EmpmemberPositionsComponent,
        pathMatch: 'full',
      },
      {
        path: 'position/dutybullets',
        component: PositionDutyBulletsComponent,
      },
      {
        path: 'empmembersearch',
        component: EmpmemberSearchComponent,
        pathMatch: 'full',
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        resolve: { member: MemberDetailResolver },
      },
      {
        path: 'memberdetailstudent/:username',
        component: MemberDetailStudentComponent,
        resolve: { member: MemberDetailResolver },
      },
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

      {
        path: 'new/position/add',
        component: EditNewPositionComponent,
        canDeactivate: [PreventUnsavedAddPositionChangesGuard],
        pathMatch: 'full',
      },

      {
        path: 'new2/position/add',
        component: EditNew2PositionComponent,
        // canDeactivate: [PreventUnsavedAddPositionChangesGuard],
        pathMatch: 'full',
      },
      {
        path: 'new2/preposition/add',
        component: EditNew2PrepositionComponent,
        pathMatch: 'full',
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
        path: 'positiondutybullets/:positionId',
        component: PositionDutyBulletsComponent,
        pathMatch: 'full',
        resolve: { position: PositionBulletResolver },
      },
      {
        path: 'positionaacbullets/:appUserId',
        component: PositionaAcBulletsComponent,
        pathMatch: 'full',
      },
      {
        path: 'positionaworkbullets/:appUserId',
        component: PositionaWorkBulletsComponent,
        pathMatch: 'full',
      },
      {
        path: 'positionskillsbullets/:positionId',
        component: PositionSkillsBulletsComponent,
        pathMatch: 'full',
        resolve: { position: PositionBulletResolver },
      },
      {
        path: 'positionbulletshome/:positionId',
        component: PositionBulletsHomeComponent,
        pathMatch: 'full',
        resolve: { position: PositionBulletResolver },
      },
      {
        path: 'positionviewdutybullets/:positionId',
        component: PositionViewDutyBulletsComponent,
        pathMatch: 'full',
        resolve: { position: PositionBulletResolver },
      },
      {
        path: 'positionviewskillsbullets/:positionId',
        component: PositionViewSkillsBulletsComponent,
        pathMatch: 'full',
        resolve: { position: PositionBulletResolver },
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
    path: 'newpositiondetailemps/:positionId',
    component: PositionDetailNewEmpsComponent,
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
  {
    path: 'editnews/:newsId',
    component: EditNewsComponent,
    pathMatch: 'full',
  },
  {
    path: 'detailnews/:newsId',
    component: DetailNewsComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit2position',
    component: Edit2PositionComponent,
    pathMatch: 'full',
  },
  {
    path: 'collegelist',
    component: CollegeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'addnews',
    component: AddNewsComponent,
    pathMatch: 'full',
  },
  {
    path: 'listnews',
    component: ListNewsComponent,
    pathMatch: 'full',
  },
  {
    path: 'collegeedit/:collegeId',
    component: CollegeEditComponent,
    pathMatch: 'full',
  },
  {
    path: 'positioneditdutybullet/:dutyBulletId',
    component: PositionEditDutyBulletsComponent,
    pathMatch: 'full',
  },
  {
    path: 'positionaeditacbullet/:acBulletId',
    component: PositionaEditAcBulletsComponent,
    pathMatch: 'full',
  },
  {
    path: 'positioneditskillsbullet/:skillsBulletId',
    component: PositionEditSkillsBulletsComponent,
    pathMatch: 'full',
  },
  {
    path: 'positionaeditworkbullet/:workBulletId',
    component: PositionaEditWorkBulletsComponent,
    pathMatch: 'full',
  },
  { path: 'about', component: AboutComponent },
  // { path: 'positionslist', component: PositionsListComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'company/edit', component: EmpmemberEditEmpinfoComponent },
  { path: 'categorylist', component: CategoryListComponent, pathMatch: 'full' },
  {
    path: 'categoryliststudents',
    component: CategoryListStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'locationliststudents',
    component: LocationListStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'poscategorylist',
    component: PoscategoryListComponent,
    pathMatch: 'full',
  },
  {
    path: 'poscategorieslistemps',
    component: PoscategoriesListEmpsComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'categoryedit/:categoryId',
  //   component: CategoryEditComponent,
  //   pathMatch: 'full',
  // },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
