import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { PositionService } from 'src/app/_services/position.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-message-detail',
  templateUrl: './empmember-message-detail.component.html',
  styleUrls: ['./empmember-message-detail.component.css'],
})
export class EmpmemberMessageDetailComponent implements OnInit {
  id: number;
  member: Member;
  link: string;
  positions: Position[];

  constructor(
    private searchMembersService: SearchMembersService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.loadMember();
    this.loadPositions();
  }

  loadMember() {
    this.id = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st id in loadMember: ', this.id);
    this.searchMembersService
      .getSearchMemberById(this.id)
      .subscribe((member) => {
        this.member = member;
        console.log('member Id: ', this.member.appUserId);
        // console.log('link: ', this.cardMember.empWebsite);
        // this.link = this.cardMember.empWebsite;
      });
  }

  loadPositions() {
    this.positionService.getPositions(this.id).subscribe((positions) => {
      this.positions = positions;
    });
  }

  goToLink() {
    this.document.location.href = this.member.empWebsite;
  }
}
