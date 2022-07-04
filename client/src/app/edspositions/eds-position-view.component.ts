import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DutyBullet } from '../_models/dutyBullet';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { Message } from '../_models/message';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';
import { EmpinfoService } from '../_services/empinfo.service';
import { MessageService } from '../_services/message.service';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-eds-position-view',
  templateUrl: './eds-position-view.component.html',
  styleUrls: ['./eds-position-view.component.css'],
})
export class EdsPositionViewComponent implements OnInit {
  position: Position;
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  @Input() skillsBullets: SkillsBullet[];
  id: number;
  member: Member;
  empInfo: EmpInfo;
  messages: Message[] = [];

  constructor(
    private bulletService: BulletService,
    private position2Service: Position2Service,
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private empInfoService: EmpinfoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPosition();

    // this.route.queryParams.subscribe((params) => {
    //   params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    // });
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

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  // selectTab(tabId: number) {
  //   this.memberTabs.tabs[tabId].active = true;
  // }

  // onTabActivated(data: TabDirective) {
  //   this.activeTab = data;
  //   if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
  //     this.loadMessages();
  //   }
  // }
}
