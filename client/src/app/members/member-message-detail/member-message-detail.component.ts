import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-message-detail',
  templateUrl: './member-message-detail.component.html',
  styleUrls: ['./member-message-detail.component.css'],
})
export class MemberMessageDetailComponent implements OnInit {
  member: Member;

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
    this.searchMemberService
      .getSearchMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        console.log('username: ', member.username);
      });
  }
}
