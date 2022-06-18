import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterStudComponent } from './register-stud/register-stud.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { EmpmemberListComponent } from './empmembers/empmember-list/empmember-list.component';
import { EmpmemberDetailComponent } from './empmembers/empmember-detail/empmember-detail.component';
import { AboutComponent } from './about/about.component';
import { MemberSearchComponent } from './members/member-search/member-search.component';
import { EmpmemberSearchComponent } from './empmembers/empmember-search/empmember-search.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberSearchCardComponent } from './members/member-search-card/member-search-card.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { EmpmemberCardComponent } from './empmembers/empmember-card/empmember-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditCardnphotoComponent } from './members/member-edit-cardnphoto/member-edit-cardnphoto.component';
import { MemberEditStudinfoComponent } from './members/member-edit-studinfo/member-edit-studinfo.component';
import { EmpmemberEditCardnlogoComponent } from './empmembers/empmember-edit-cardnlogo/empmember-edit-cardnlogo.component';
import { EmpmemberEditEmpinfoComponent } from './empmembers/empmember-edit-empinfo/empmember-edit-empinfo.component';
import { EmpmemberEditPositionComponent } from './empmembers/empmember-edit-position/empmember-edit-position.component';
import { AddStudInfoComponent } from './studinfos/add-stud-info/add-stud-info.component';
import { AddPositionComponent } from './positions/add-position/add-position.component';
import { EmpmemberPositionsComponent } from './empmembers/empmember-positions/empmember-positions.component';
import { EditPositionComponent } from './positions/edit-position/edit-position.component';
import { PositionCardComponent } from './positions/position-card.component';
import { PositionsListComponent } from './positions/positions-list.component';
import { PositionDetailComponent } from './positions/position-detail.component';
import { PositionDetailNewComponent } from './positions/position-detail-new.component';
import { Empmember2EditEmpinfoComponent } from './empmembers/empmember2-edit-empinfo.component';
import { EmpmemberCompDetailComponent } from './empmembers/empmember-comp-detail/empmember-comp-detail.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { LikesCardComponent } from './likes/likes-card/likes-card.component';
import { EmpmemberThumbsupDetailComponent } from './empmembers/empmember-thumbsup-detail/empmember-thumbsup-detail.component';
import { MemberThumbsupDetailComponent } from './members/member-thumbsup-detail/member-thumbsup-detail.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { EmpmemberMessageDetailComponent } from './empmembers/empmember-message-detail/empmember-message-detail.component';
import { EmpmemberSuperDetailComponent } from './empmembers/empmember-super-detail/empmember-super-detail.component';
import { EmpmemberListSuperComponent } from './empmembers/empmember-list-super/empmember-list-super.component';
import { EmpmemberCardSuperComponent } from './empmembers/empmember-card-super/empmember-card-super.component';
import { PositionDetailSuperNewComponent } from './positions/position-detail-super-new/position-detail-super-new.component';
import { PositionDetailEmployerComponent } from './positions/position-detail-employer/position-detail-employer.component';
import { PositionDetailThumbsupComponent } from './positions/position-detail-thumbsup/position-detail-thumbsup.component';
import { PositionDetailmessageComponent } from './positions/position-detailmessage/position-detailmessage.component';
import { MemberMessageDetailComponent } from './members/member-message-detail/member-message-detail.component';
import { LikesMessageCardComponent } from './likes/likes-message-card/likes-message-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PositionDutyBulletsComponent } from './position-duty-bullets/position-duty-bullets.component';
import { PositionViewDutyBulletsComponent } from './position-duty-bullets/position-view-duty-bullets.component';
import { PositionEditDutyBulletsComponent } from './position-duty-bullets/position-edit-duty-bullets.component';
import { PositionSkillsBulletsComponent } from './position-skills-bullets/position-skills-bullets.component';
import { PositionEditSkillsBulletsComponent } from './position-skills-bullets/position-edit-skills-bullets.component';
import { PositionViewSkillsBulletsComponent } from './position-skills-bullets/position-view-skills-bullets.component';
import { PositionBulletsHomeComponent } from './position-duty-bullets/position-bullets-home.component';
import { PhotoEditorHrComponent } from './photo-editor-hr/photo-editor-hr.component';
import { EditNewPositionComponent } from './positions/edit-new-position.component';
import { EditNew2PositionComponent } from './positions/edit-new2-position.component';
import { MemberListSearchComponent } from './members/member-list-search/member-list-search.component';
import { AddMajorsComponent } from './categories-and-majors/add-majors/add-majors.component';
import { YesNoPipe } from './yes-no.pipe';
import { CategoryListComponent } from './categories-and-majors/category-list/category-list.component';
import { CategoryEditComponent } from './categories-and-majors/category-edit/category-edit.component';
import { MajorEditComponent } from './categories-and-majors/major-edit/major-edit.component';
import { AddPositnameComponent } from './poscategories-and-positnames/add-positname/add-positname.component';
import { PoscategoryEditComponent } from './poscategories-and-positnames/poscategory-edit/poscategory-edit.component';
import { PoscategoryListComponent } from './poscategories-and-positnames/poscategory-list/poscategory-list.component';
import { PositnameEditComponent } from './poscategories-and-positnames/positname-edit/positname-edit.component';
import { ProfileadviceListComponent } from './profileAdvices/profileadvice-list/profileadvice-list.component';
import { ProfileadviceEditComponent } from './profileAdvices/profileadvice-edit/profileadvice-edit.component';
import { ProfileadviceNewListComponent } from './profileAdvices/profileadvice-new-list/profileadvice-new-list.component';
import { PhotoEditorLogoComponent } from './photo-editor-logo/photo-editor-logo.component';
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
import { EmpindustryListComponent } from './empindustries/empindustry-list.component';
import { EmpindustryEditComponent } from './empindustries/empindustry-edit.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    UserLoginComponent,
    RegisterHomeComponent,
    RegisterEmpComponent,
    RegisterStudComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    EmpmemberListComponent,
    EmpmemberDetailComponent,
    AboutComponent,
    MemberSearchComponent,
    EmpmemberSearchComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberSearchCardComponent,
    MemberCardComponent,
    EmpmemberCardComponent,
    MemberEditCardnphotoComponent,
    MemberEditStudinfoComponent,
    EmpmemberEditCardnlogoComponent,
    EmpmemberEditEmpinfoComponent,
    EmpmemberEditPositionComponent,
    AddStudInfoComponent,
    AddPositionComponent,
    EmpmemberPositionsComponent,
    EditPositionComponent,
    PositionCardComponent,
    PositionsListComponent,
    PositionDetailComponent,
    PositionDetailNewComponent,
    Empmember2EditEmpinfoComponent,
    EmpmemberCompDetailComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    LikesCardComponent,
    EmpmemberThumbsupDetailComponent,
    MemberThumbsupDetailComponent,
    MemberMessagesComponent,
    EmpmemberMessageDetailComponent,
    EmpmemberSuperDetailComponent,
    EmpmemberListSuperComponent,
    EmpmemberCardSuperComponent,
    PositionDetailSuperNewComponent,
    PositionDetailEmployerComponent,
    PositionDetailThumbsupComponent,
    PositionDetailmessageComponent,
    MemberMessageDetailComponent,
    LikesMessageCardComponent,
    PositionDutyBulletsComponent,
    PositionViewDutyBulletsComponent,
    PositionEditDutyBulletsComponent,
    PositionSkillsBulletsComponent,
    PositionEditSkillsBulletsComponent,
    PositionViewSkillsBulletsComponent,
    PositionBulletsHomeComponent,
    PhotoEditorHrComponent,
    EditNewPositionComponent,
    EditNew2PositionComponent,
    MemberListSearchComponent,
    AddMajorsComponent,
    YesNoPipe,
    CategoryListComponent,
    CategoryEditComponent,
    MajorEditComponent,
    AddPositnameComponent,
    PoscategoryEditComponent,
    PoscategoryListComponent,
    PositnameEditComponent,
    ProfileadviceListComponent,
    ProfileadviceEditComponent,
    ProfileadviceNewListComponent,
    PhotoEditorLogoComponent,
    PreregisterStudComponent,
    RegisterCodeListComponent,
    RegisterCodeEditComponent,
    Step1RegisterStudComponent,
    CategoryListStudentsComponent,
    AddMajorsStudentsComponent,
    LocationListComponent,
    AddStlocationsComponent,
    AddCilocationsComponent,
    ColocationEditComponent,
    StlocationEditComponent,
    CilocationEditComponent,
    LocationListStudentsComponent,
    AddStlocationsStudentsComponent,
    AddCilocationsStudentsComponent,
    PreregisterEmpComponent,
    Step1RegisterEmpComponent,
    EmpindustryListComponent,
    EmpindustryEditComponent,
    EmpindustryListEmpsComponent,
    StemplocationListComponent,
    AddCiemplocationsComponent,
    StemplocationEditComponent,
    CiemplocationEditComponent,
    AddCiemplocationsEmpsComponent,
    StemplocationListEmpsComponent,
    PoscategoriesListEmpsComponent,
    AddPositnamesEmpsComponent,
    EditNew2PrepositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
