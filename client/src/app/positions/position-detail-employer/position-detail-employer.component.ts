import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { EmpInfo } from 'src/app/_models/empInfo';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { Position } from 'src/app/_models/position';
import { EmpinfoService } from 'src/app/_services/empinfo.service';
import { MessageService } from 'src/app/_services/message.service';
import { Position2Service } from 'src/app/_services/position2.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-position-detail-employer',
  templateUrl: './position-detail-employer.component.html',
  styleUrls: ['./position-detail-employer.component.css'],
})
export class PositionDetailEmployerComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  position: Position;
  positionId: number;
  id: number;
  member: Member;
  empInfo: EmpInfo;
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private position2Service: Position2Service,
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private empInfoService: EmpinfoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('1st positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
        this.id = this.position.appUserId;
        console.log('memberid :', this.id);
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

  goToLink() {
    this.document.location.href = this.member.empWebsite;
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
