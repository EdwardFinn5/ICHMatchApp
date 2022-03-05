import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-thumbsup-detail',
  templateUrl: './member-thumbsup-detail.component.html',
  styleUrls: ['./member-thumbsup-detail.component.css'],
})
export class MemberThumbsupDetailComponent implements OnInit {
  member: Member;
  id: number;

  constructor(
    private searchMemberService: SearchMembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  // loadMember() {
  //   this.searchMemberService
  //     .getSearchMember(this.route.snapshot.paramMap.get('username'))
  //     .subscribe((member) => {
  //       this.member = member;
  //       console.log('username: ', member.username);
  //     });
  // }

  loadMember() {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.searchMemberService
      .getSearchMemberById(this.id)
      .subscribe((member) => {
        this.member = member;
        console.log('member Id: ', this.member.appUserId);
        // console.log('link: ', this.cardMember.empWebsite);
        // this.link = this.cardMember.empWebsite;
      });
  }
}
