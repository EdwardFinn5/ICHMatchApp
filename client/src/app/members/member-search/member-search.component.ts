import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  members$: Observable<Member[]>;
  positions: Position[];

  constructor(private searchMemberService: SearchMembersService) {}

  ngOnInit(): void {
    this.members$ = this.searchMemberService.getSearchMembers();
  }

  // loadMembers() {
  //   this.searchMemberService.getSearchMembers().subscribe((members) => {
  //     this.members = members;
  //   });
  // }
}
