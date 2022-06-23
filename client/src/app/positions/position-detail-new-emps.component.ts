import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DutyBullet } from '../_models/dutyBullet';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';
import { EmpinfoService } from '../_services/empinfo.service';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-position-detail-new-emps',
  templateUrl: './position-detail-new-emps.component.html',
  styleUrls: ['./position-detail-new-emps.component.css'],
})
export class PositionDetailNewEmpsComponent implements OnInit {
  position: Position;
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  @Input() skillsBullets: SkillsBullet[];
  id: number;
  member: Member;
  empInfo: EmpInfo;

  constructor(
    private bulletService: BulletService,
    private position2Service: Position2Service,
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute,
    private empInfoService: EmpinfoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('1st wow positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
        this.id = this.position.appUserId;
        console.log('memberid :', this.id);
        this.loadDutyBullets(this.positionId);
        this.loadSkillsBullets(this.positionId);
        this.loadMember(this.id);
      });
  }
  loadMember(id: number) {
    this.searchMembersService.getSearchMemberById(id).subscribe((member) => {
      this.member = member;
      console.log('member Id: ', this.member.appUserId);
      this.loadEmpInfo(this.id);
    });
  }

  loadEmpInfo(id: number) {
    this.searchMembersService.getEmpInfo(id).subscribe((empInfo) => {
      this.empInfo = empInfo;
      console.log('member Id: ', this.empInfo.appUserId);
    });
  }

  loadDutyBullets(id: number) {
    this.bulletService.getDutyBullets(id).subscribe((dutyBullets) => {
      this.dutyBullets = dutyBullets;
    });
  }

  loadSkillsBullets(id: number) {
    this.bulletService.getSkillsBullets(id).subscribe((skillsBullets) => {
      this.skillsBullets = skillsBullets;
    });
  }

  goToLink() {
    this.document.location.href = this.empInfo.empWebsite;
  }

  goToNewLink() {
    this.document.location.href = this.position.applyLink;
  }
}
