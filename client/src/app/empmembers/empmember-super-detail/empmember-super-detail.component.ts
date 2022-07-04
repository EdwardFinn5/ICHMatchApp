import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { EmpInfo } from 'src/app/_models/empInfo';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { Position } from 'src/app/_models/position';
import { MessageService } from 'src/app/_services/message.service';
import { PositionService } from 'src/app/_services/position.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-super-detail',
  templateUrl: './empmember-super-detail.component.html',
  styleUrls: ['./empmember-super-detail.component.css'],
})
export class EmpmemberSuperDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  id: number;
  member: Member;
  link: string;
  empInfo: EmpInfo;
  positions: Position[];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private searchMembersService: SearchMembersService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.loadMember();
    this.loadPositions();
  }

  loadMember() {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.searchMembersService
      .getSearchMemberById(this.id)
      .subscribe((member) => {
        this.member = member;
        console.log('member Id: ', this.member.appUserId);
        this.loadEmpInfo(this.id);
        // console.log('link: ', this.cardMember.empWebsite);
        // this.link = this.cardMember.empWebsite;
      });
  }

  loadPositions() {
    this.positionService.getPositions(this.id).subscribe((positions) => {
      this.positions = positions;
    });
  }

  loadEmpInfo(id: number) {
    this.searchMembersService.getEmpInfo(id).subscribe((empInfo) => {
      this.empInfo = empInfo;
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
