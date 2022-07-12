import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';
import { StudinfoService } from '../_services/studinfo.service';

@Component({
  selector: 'app-positiona-ac-bullets',
  templateUrl: './positiona-ac-bullets.component.html',
  styleUrls: ['./positiona-ac-bullets.component.css'],
})
export class PositionaAcBulletsComponent implements OnInit {
  member: Member;
  appUserId: number;
  @Input() acBullets: AcBullet[];
  @ViewChild('acBulletForm') acBulletForm: NgForm;
  acBullet: string;
  loading = false;
  acBulletId: number;
  studInfoId: number;
  studInfo: StudInfo;

  constructor(
    private bulletService: BulletService,
    private studInfoService: StudinfoService,
    private route: ActivatedRoute,
    private searchMemberService: SearchMembersService
  ) {}

  // ngOnInit(): void {
  //   this.loadAcBullets();
  // }
  ngOnInit(): void {
    this.loadStudInfo();
  }

  loadStudInfo() {
    this.studInfoId = +this.route.snapshot.paramMap.get('studInfoId');
    console.log('1st studInfoId: ', this.studInfoId);
    this.studInfoService
      .getStudInfoById(+this.route.snapshot.paramMap.get('studInfoId'))
      .subscribe((studInfo) => {
        this.studInfo = studInfo;
        console.log('studInfoId: ', studInfo.studInfoId);
        this.loadAcBullets();
      });
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
  //       this.loadAcBullets();
  //     });
  // }

  loadAcBullets() {
    this.studInfoId = +this.route.snapshot.paramMap.get('studInfoId');
    console.log('studInfoId: ', this.studInfoId);
    this.bulletService.getAcBullets(this.studInfoId).subscribe((acBullets) => {
      this.acBullets = acBullets;
      console.log(acBullets);
    });
  }

  addAcBullet() {
    this.bulletService
      .addAcBullet(this.studInfoId, this.acBulletForm.value)
      .subscribe((acBullet) => {
        this.acBullets.push(acBullet);
        this.acBulletForm.reset();
        this.loadAcBullets();
      });
  }

  deleteAcBullet(id: number) {
    this.acBulletId = id;
    console.log('acBulletId: ', this.acBulletId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.bulletService.deleteAcBullet(id).subscribe(() => {
      this.acBullets.splice(
        this.acBullets.findIndex((m) => m.acBulletId === id),
        1
      );
    });
  }
}
