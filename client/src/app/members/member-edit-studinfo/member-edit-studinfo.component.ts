import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { StudInfo } from 'src/app/_models/studinfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';
import { StudinfoService } from 'src/app/_services/studinfo.service';

@Component({
  selector: 'app-member-edit-studinfo',
  templateUrl: './member-edit-studinfo.component.html',
  styleUrls: ['./member-edit-studinfo.component.css'],
})
export class MemberEditStudinfoComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  studInfo: StudInfo;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountservice: AccountService,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private studInfoService: StudinfoService
  ) {
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadStudInfo();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }

  loadStudInfo() {
    this.studInfoService
      .getStudInfo(this.user.appUserId)
      .subscribe((studInfo: StudInfo) => {
        this.studInfo = studInfo;
        console.log(studInfo.appUserId);
      });
  }

  updateStudInfo() {
    this.studInfoService
      .updateStudInfoMember(this.studInfo, this.user.appUserId)
      .subscribe(() => {
        this.toastr.success('Academic info updated');
        this.editForm.reset(this.studInfo);
      });
  }
}
