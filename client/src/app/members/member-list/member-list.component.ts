import { Component, OnInit } from '@angular/core';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  cardMembers: CardMember[];

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadCardMembers();
  }

  loadCardMembers() {
    this.memberService.getMembers().subscribe((cardMembers) => {
      this.cardMembers = cardMembers;
    });
  }
}
