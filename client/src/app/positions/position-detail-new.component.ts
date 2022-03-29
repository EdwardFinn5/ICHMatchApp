import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { DutyBullet } from '../_models/DutyBullet';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { Message } from '../_models/message';
import { Position } from '../_models/position';
import { BulletService } from '../_services/bullet.service';
import { EmpinfoService } from '../_services/empinfo.service';
import { MembersService } from '../_services/members.service';
import { MessageService } from '../_services/message.service';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-position-detail-new',
  templateUrl: './position-detail-new.component.html',
  styleUrls: ['./position-detail-new.component.css'],
})
export class PositionDetailNewComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  position: Position;
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  id: number;
  member: Member;
  empInfo: EmpInfo;
  activeTab: TabDirective;
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
    // this.positionId = +this.route.snapshot.paramMap.get('positionId');
    // console.log('1st positionId: ', this.positionId);
    this.bulletService.getdutyBullets(id).subscribe((dutyBullets) => {
      this.dutyBullets = dutyBullets;
    });
  }

  goToLink() {
    this.document.location.href = this.empInfo.empWebsite;
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }
}
