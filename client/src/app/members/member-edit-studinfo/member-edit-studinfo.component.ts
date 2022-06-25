import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AcBullet } from 'src/app/_models/acBullet';
import { Member } from 'src/app/_models/member';
import { StudInfo } from 'src/app/_models/studinfo';
import { User } from 'src/app/_models/user';
import { WorkBullet } from 'src/app/_models/workBullet';
import { AccountService } from 'src/app/_services/account.service';
import { BulletService } from 'src/app/_services/bullet.service';
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
  @Input() acBullets: AcBullet[];
  @Input() workBullets: WorkBullet[];
  acBullet: string;
  workBullet: string;
  loading = false;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private accountservice: AccountService,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private studInfoService: StudinfoService,
    private bulletService: BulletService
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
        this.loadAcBullets();
        this.loadWorkBullets();
      });
  }

  loadAcBullets() {
    this.bulletService
      .getAcBullets(this.user.appUserId)
      .subscribe((acBullets) => {
        this.acBullets = acBullets;
      });
  }

  loadWorkBullets() {
    this.bulletService
      .getWorkBullets(this.user.appUserId)
      .subscribe((workBullets) => {
        this.workBullets = workBullets;
      });
  }

  addAcBullets() {
    this.router.navigateByUrl('/positionaacbullets/' + this.user.appUserId);
  }

  addWorkBullets() {
    this.router.navigateByUrl('/positionaworkbullets/' + this.user.appUserId);
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
