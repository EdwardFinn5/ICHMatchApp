import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  cardMembers: CardMember[];
  // members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 4;
  appUserType = 'ColStudent';

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadCardMembers();
  }

  loadCardMembers() {
    this.membersService
      .getMembers(this.pageNumber, this.pageSize, this.appUserType)
      .subscribe((response) => {
        this.cardMembers = response.result;
        this.pagination = response.pagination;
      });
  }

  // loadCardMembers() {
  //   this.memberService.getStudentMembers(this.appUserType).subscribe;
  // }

  // loadCardMembers() {
  //   this.membersService
  //     .getMembers(this.appUserType)
  //     .subscribe((cardMembers) => {
  //       this.cardMembers = cardMembers;
  //     });
  // }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadCardMembers();
  }
}
