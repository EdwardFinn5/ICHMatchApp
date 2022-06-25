import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-member-detail-student',
  templateUrl: './member-detail-student.component.html',
  styleUrls: ['./member-detail-student.component.css'],
})
export class MemberDetailStudentComponent implements OnInit {
  member: Member;
  appUserId: number;
  @Input() acBullets: AcBullet[];
  @Input() workBullets: WorkBullet[];

  constructor(
    private bulletService: BulletService,
    private searchMemberService: SearchMembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.searchMemberService
      .getSearchMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        console.log('username: ', member.username);
        console.log('appUserId: ', this.member.appUserId);
        this.loadAcBullets(this.member.appUserId);
        this.loadWorkBullets(this.member.appUserId);
      });
  }

  loadAcBullets(id: number) {
    this.bulletService.getAcBullets(id).subscribe((acBullets) => {
      this.acBullets = acBullets;
    });
  }

  loadWorkBullets(id: number) {
    this.bulletService.getWorkBullets(id).subscribe((workBullets) => {
      this.workBullets = workBullets;
    });
  }
}
