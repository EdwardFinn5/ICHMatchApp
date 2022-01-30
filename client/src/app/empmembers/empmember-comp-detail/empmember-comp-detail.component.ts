import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-comp-detail',
  templateUrl: './empmember-comp-detail.component.html',
  styleUrls: ['./empmember-comp-detail.component.css'],
})
export class EmpmemberCompDetailComponent implements OnInit {
  id: number;
  member: Member;

  constructor(
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute
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
      });
  }
}
