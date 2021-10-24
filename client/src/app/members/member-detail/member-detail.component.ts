import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(
    private searchMemberService: SearchMembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.searchMemberService
      .getSearchMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }
}
