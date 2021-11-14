import { Component, Input, OnInit } from '@angular/core';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() cardMember: CardMember;
  @Input() member: Member;

  constructor() {}

  ngOnInit(): void {}

  addlike() {}
}
