import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';
import { StudinfoService } from '../_services/studinfo.service';

@Component({
  selector: 'app-student-studinfo-edit',
  templateUrl: './student-studinfo-edit.component.html',
  styleUrls: ['./student-studinfo-edit.component.css'],
})
export class StudentStudinfoEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  studInfo: StudInfo;
  member: Member;
  appUserId: number;
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
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private studInfoService: StudinfoService,
    private bulletService: BulletService
  ) {}

  ngOnInit(): void {
    this.loadMember();
    this.loadStudInfo();
  }

  loadMember() {
    this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
    this.searchMembersService
      .getByIdSearchMember(this.appUserId)
      .subscribe((member) => {
        this.member = member;
      });
  }

  loadStudInfo() {
    this.studInfoService
      .getStudInfo(this.appUserId)
      .subscribe((studInfo: StudInfo) => {
        this.studInfo = studInfo;
        console.log(studInfo.appUserId);
        this.loadAcBullets();
        this.loadWorkBullets();
      });
  }

  loadAcBullets() {
    this.bulletService.getAcBullets(this.appUserId).subscribe((acBullets) => {
      this.acBullets = acBullets;
    });
  }

  loadWorkBullets() {
    this.bulletService
      .getWorkBullets(this.appUserId)
      .subscribe((workBullets) => {
        this.workBullets = workBullets;
      });
  }

  addAcBullets() {
    this.router.navigateByUrl('/edspositionaacbullets/' + this.appUserId);
  }

  addWorkBullets() {
    this.router.navigateByUrl('/edspositionaworkbullets/' + this.appUserId);
  }

  updateStudInfo() {
    this.studInfoService
      .updateStudInfoMember(this.studInfo, this.appUserId)
      .subscribe(() => {
        this.toastr.success('Academic info updated');
        this.editForm.reset(this.studInfo);
      });
  }
}
