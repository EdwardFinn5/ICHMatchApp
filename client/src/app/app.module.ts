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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
