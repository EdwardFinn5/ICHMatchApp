import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { AcBullet } from 'src/app/_models/acBullet';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { WorkBullet } from 'src/app/_models/workBullet';
import { BulletService } from 'src/app/_services/bullet.service';
import { MessageService } from 'src/app/_services/message.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  member: Member;
  appUserId: number;
  activeTab: TabDirective;
  messages: Message[] = [];
  @Input() acBullets: AcBullet[];
  @Input() workBullets: WorkBullet[];

  constructor(
    private bulletService: BulletService,
    private searchMemberService: SearchMembersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });

    this.route.queryParams.subscribe((params) => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });
    this.loadAcBullets(this.member.appUserId);
    this.loadWorkBullets(this.member.appUserId);
  }

  // loadMember() {
  //   this.searchMemberService
  //     .getSearchMember(this.route.snapshot.paramMap.get('username'))
  //     .subscribe((member) => {
  //       this.member = member;
  //       console.log('username: ', member.username);
  //     });
  // }

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
