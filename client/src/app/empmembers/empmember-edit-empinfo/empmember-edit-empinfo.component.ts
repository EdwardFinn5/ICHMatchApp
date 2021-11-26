import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { EmpInfo } from 'src/app/_models/empInfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-edit-empinfo',
  templateUrl: './empmember-edit-empinfo.component.html',
  styleUrls: ['./empmember-edit-empinfo.component.css'],
})
export class EmpmemberEditEmpinfoComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  empInfo: EmpInfo;
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
    private toastr: ToastrService
  ) {
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadEmpInfo();
  }

  loadEmpInfo() {
    this.searchMembersService
      .getEmpInfo(this.user.appUserId)
      .subscribe((empInfo: EmpInfo) => {
        this.empInfo = empInfo;
        console.log(empInfo.appUserId);
      });
  }

  updateEmpInfo() {
    console.log(this.empInfo);
    this.toastr.success('Employer info updated');
    this.editForm.reset(this.empInfo);
  }
}
