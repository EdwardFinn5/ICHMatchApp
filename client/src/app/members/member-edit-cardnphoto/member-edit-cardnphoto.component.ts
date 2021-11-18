import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-edit-cardnphoto',
  templateUrl: './member-edit-cardnphoto.component.html',
  styleUrls: ['./member-edit-cardnphoto.component.css'],
})
export class MemberEditCardnphotoComponent implements OnInit {
  member: Member;
  user: User;

  constructor(
    private accountService: AccountService,
    private searchMembersService: SearchMembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }
}
