import { Component, OnInit } from '@angular/core';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-empmember-list',
  templateUrl: './empmember-list.component.html',
  styleUrls: ['./empmember-list.component.css'],
})
export class EmpmemberListComponent implements OnInit {
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
