import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { StudInfo } from 'src/app/_models/studinfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { StudinfoService } from 'src/app/_services/studinfo.service';

@Component({
  selector: 'app-add-stud-info',
  templateUrl: './add-stud-info.component.html',
  styleUrls: ['./add-stud-info.component.css'],
})
export class AddStudInfoComponent implements OnInit {
  model: any = {};
  @ViewChild('addStudInfoForm') addStudInfoForm: NgForm;
  studInfo: StudInfo;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.addStudInfoForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private studInfoService: StudinfoService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  addStudInfo() {
    this.studInfoService
      .addStudInfo(this.model, this.user.appUserId)
      .subscribe(() => {
        this.toastr.success('Academic/Work info added');
        this.addStudInfoForm.reset(this.model);
      });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
