import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';
import { StudinfoService } from '../_services/studinfo.service';

@Component({
  selector: 'app-positiona-work-bullets',
  templateUrl: './positiona-work-bullets.component.html',
  styleUrls: ['./positiona-work-bullets.component.css'],
})
export class PositionaWorkBulletsComponent implements OnInit {
  member: Member;
  appUserId: number;
  @Input() workBullets: WorkBullet[];
  @ViewChild('workBulletForm') workBulletForm: NgForm;
  workBullet: string;
  loading = false;
  workBulletId: number;
  studInfo: StudInfo;
  studInfoId: number;

  constructor(
    private bulletService: BulletService,
    private route: ActivatedRoute,
    private studInfoService: StudinfoService,
    private searchMemberService: SearchMembersService
  ) {}

  ngOnInit(): void {
    this.loadStudInfo();
  }

  // loadSearchMember() {
  //   this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
  //   console.log('1st appUserId: ', this.appUserId);
  //   this.searchMemberService
  //     .getSearchMemberById(+this.route.snapshot.paramMap.get('appUserId'))
  //     .subscribe((member) => {
  //       this.member = member;
  //       this.firstName = member.firstName;
  //       console.log('appUserId: ', member.appUserId);
  //       this.loadWorkBullets();
  //     });
  // }

  loadStudInfo() {
    this.studInfoId = +this.route.snapshot.paramMap.get('studInfoId');
    console.log('1st studInfoId: ', this.studInfoId);
    this.studInfoService
      .getStudInfoById(+this.route.snapshot.paramMap.get('studInfoId'))
      .subscribe((studInfo) => {
        this.studInfo = studInfo;
        console.log('studInfoId: ', studInfo.studInfoId);
        this.loadWorkBullets();
      });
  }

  loadWorkBullets() {
    this.studInfoId = +this.route.snapshot.paramMap.get('studInfoId');
    this.bulletService
      .getWorkBullets(this.studInfoId)
      .subscribe((workBullets) => {
        this.workBullets = workBullets;
      });
  }

  addWorkBullet() {
    this.bulletService
      .addWorkBullet(this.studInfoId, this.workBulletForm.value)
      .subscribe((workBullet) => {
        this.workBullets.push(workBullet);
        this.workBulletForm.reset();
        this.loadWorkBullets();
      });
  }

  deleteWorkBullet(id: number) {
    this.workBulletId = id;
    console.log('workBulletId: ', this.workBulletId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.bulletService.deleteWorkBullet(id).subscribe(() => {
      this.workBullets.splice(
        this.workBullets.findIndex((m) => m.workBulletId === id),
        1
      );
    });
  }
}
