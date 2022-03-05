import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-thumbsup-detail',
  templateUrl: './empmember-thumbsup-detail.component.html',
  styleUrls: ['./empmember-thumbsup-detail.component.css'],
})
export class EmpmemberThumbsupDetailComponent implements OnInit {
  id: number;
  member: Member;
  link: string;

  constructor(
    private searchMembersService: SearchMembersService,
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
    this.searchMembersService
      .getSearchMemberById(this.id)
      .subscribe((member) => {
        this.member = member;
        console.log('member Id: ', this.member.appUserId);
        // console.log('link: ', this.cardMember.empWebsite);
        // this.link = this.cardMember.empWebsite;
      });
  }

  goToLink() {
    this.document.location.href = this.member.empWebsite;
  }
}
