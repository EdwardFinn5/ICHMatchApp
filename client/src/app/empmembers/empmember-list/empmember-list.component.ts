import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-empmember-list',
  templateUrl: './empmember-list.component.html',
  styleUrls: ['./empmember-list.component.css'],
})
export class EmpmemberListComponent implements OnInit {
  cardMembers: CardMember[];
  pagination: Pagination;
  userParams: UserParams;
  appUserType = 'EmpHr';
  empIndustryList = [
    { value: 'Manufacturing', display: 'Manufacturing' },
    { value: 'Insurance', display: 'Insurance' },
    { value: 'Banking', display: 'Banking' },
  ];
  locationList = [
    { value: 'Des Moines, IA', display: 'Des Moines, IA' },
    { value: 'Cedar Rapids, IA', display: 'Cedar Rapids, IA' },
    { value: 'Muscatine, IA', display: 'Muscatine, IA' },
  ];

  constructor(private memberService: MembersService) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    // this.resetFilters;
    this.loadCardMembers();
  }

  loadCardMembers() {
    // this.memberService.setUserParams(this.userParams);
    this.memberService
      .getMembers(this.userParams, this.appUserType)
      .subscribe((response) => {
        this.cardMembers = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadCardMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    // this.memberService.setUserParams(this.userParams);
    this.loadCardMembers();
  }
}
