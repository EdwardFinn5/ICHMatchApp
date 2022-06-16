import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { EmpInfo } from 'src/app/_models/empInfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { EmpinfoService } from 'src/app/_services/empinfo.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';
import { Member } from '../_models/member';
@Component({
  selector: 'app-empmember2-edit-empinfo',
  templateUrl: './empmember2-edit-empinfo.component.html',
  styleUrls: ['./empmember2-edit-empinfo.component.css'],
})
export class Empmember2EditEmpinfoComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  empInfo: EmpInfo;
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
    private empInfoService: EmpinfoService
  ) {
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadEmpInfo();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }

  loadEmpInfo() {
    this.empInfoService
      .getEmpInfo(this.user.appUserId)
      .subscribe((empInfo: EmpInfo) => {
        this.empInfo = empInfo;
        console.log(empInfo.appUserId);
      });
  }

  updateEmpInfo() {
    this.empInfoService
      .updateEmpInfoMember(this.empInfo, this.user.appUserId)
      .subscribe(() => {
        this.toastr.success('Employer info updated');
        this.editForm.reset(this.empInfo);
      });
  }
}
