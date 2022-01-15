import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-detail',
  templateUrl: './empmember-detail.component.html',
  styleUrls: ['./empmember-detail.component.css'],
})
export class EmpmemberDetailComponent implements OnInit {
  member: Member;
  username: string;

  constructor(
    private searchMemberService: SearchMembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    console.log('just before this is the first username');
    this.searchMemberService
      .getSearchMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }
}
