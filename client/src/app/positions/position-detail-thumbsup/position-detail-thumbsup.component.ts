import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { Position } from 'src/app/_models/position';
import { MessageService } from 'src/app/_services/message.service';
import { Position2Service } from 'src/app/_services/position2.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-position-detail-thumbsup',
  templateUrl: './position-detail-thumbsup.component.html',
  styleUrls: ['./position-detail-thumbsup.component.css'],
})
export class PositionDetailThumbsupComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  position: Position;
  positionId: number;
  id: number;
  member: Member;
  link: string;
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private position2Service: Position2Service,
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
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
