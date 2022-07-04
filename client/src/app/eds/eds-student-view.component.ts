import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-eds-student-view',
  templateUrl: './eds-student-view.component.html',
  styleUrls: ['./eds-student-view.component.css'],
})
export class EdsStudentViewComponent implements OnInit {
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
    this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
    this.searchMemberService
      .getByIdSearchMember(this.appUserId)
      .subscribe((member) => {
        this.member = member;
        this.loadAcBullets(this.appUserId);
        this.loadWorkBullets(this.appUserId);
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
