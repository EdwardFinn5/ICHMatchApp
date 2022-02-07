import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardMember } from 'src/app/_models/cardMember';
import { DOCUMENT } from '@angular/common';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-comp-detail',
  templateUrl: './empmember-comp-detail.component.html',
  styleUrls: ['./empmember-comp-detail.component.css'],
})
export class EmpmemberCompDetailComponent implements OnInit {
  id: number;
  cardMember: CardMember;
  link: string;

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.loadMember();
  }

  loadMember() {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.membersService.getCardMemberById(this.id).subscribe((cardMember) => {
      this.cardMember = cardMember;
      console.log('member Id: ', this.cardMember.appUserId);
      // console.log('link: ', this.cardMember.empWebsite);
      // this.link = this.cardMember.empWebsite;
    });
  }

  goToLink() {
    this.document.location.href = this.cardMember.empWebsite;
  }
}
