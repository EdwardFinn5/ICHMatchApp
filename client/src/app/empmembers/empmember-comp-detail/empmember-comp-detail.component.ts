import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-comp-detail',
  templateUrl: './empmember-comp-detail.component.html',
  styleUrls: ['./empmember-comp-detail.component.css'],
})
export class EmpmemberCompDetailComponent implements OnInit {
  id: number;
  cardMember: CardMember;

  constructor(
    private membersService: MembersService,
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
    this.membersService.getCardMemberById(this.id).subscribe((cardMember) => {
      this.cardMember = cardMember;
      console.log('member Id: ', this.cardMember.appUserId);
    });
  }
}
