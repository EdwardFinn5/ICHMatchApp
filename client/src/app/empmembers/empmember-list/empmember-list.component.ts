import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-empmember-list',
  templateUrl: './empmember-list.component.html',
  styleUrls: ['./empmember-list.component.css'],
})
export class EmpmemberListComponent implements OnInit {
  cardMembers: CardMember[];
  // members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  appUserType = 'EmpHr';

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadCardMembers();
  }

  loadCardMembers() {
    this.memberService.getMembers(this.appUserType).subscribe((cardMembers) => {
      this.cardMembers = cardMembers;
    });
  }

  // loadCardMembers() {
  //   this.memberService
  //     .getMembers(this.pageNumber, this.pageSize, this.appUserType)
  //     .subscribe((response) => {
  //       this.cardMembers = response.result;
  //       this.pagination = response.pagination;
  //     });
  // }

  // pageChanged(event: any) {
  //   this.pageNumber = event.page;
  //   this.loadCardMembers();
  // }
}
