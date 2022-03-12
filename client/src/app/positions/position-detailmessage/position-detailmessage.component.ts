import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { Position2Service } from 'src/app/_services/position2.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-position-detailmessage',
  templateUrl: './position-detailmessage.component.html',
  styleUrls: ['./position-detailmessage.component.css'],
})
export class PositionDetailmessageComponent implements OnInit {
  position: Position;
  positionId: number;
  id: number;
  member: Member;

  constructor(
    private position2Service: Position2Service,
    private searchMembersService: SearchMembersService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('1st positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
        this.id = this.position.appUserId;
        console.log('memberid :', this.id);
        this.loadMember(this.id);
      });
  }

  loadMember(id: number) {
    this.searchMembersService.getSearchMemberById(id).subscribe((member) => {
      this.member = member;
      console.log('member Id: ', this.member.appUserId);
    });
  }

  goToLink() {
    this.document.location.href = this.member.empWebsite;
  }
}
