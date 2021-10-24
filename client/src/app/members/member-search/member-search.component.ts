import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  members: Member[];

  constructor(private searchMemberService: SearchMembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService.getSearchMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
