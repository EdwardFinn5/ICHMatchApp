import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CardMember } from '../_models/cardMember';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  user: User;
  pageNumber = 1;
  pageSize = 4;
  pagination: Pagination;

  constructor(
    private searchMembersService: SearchMembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }
  ngOnInit(): void {
    this.loadLikes;
  }

  loadLikes() {
    this.searchMembersService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
