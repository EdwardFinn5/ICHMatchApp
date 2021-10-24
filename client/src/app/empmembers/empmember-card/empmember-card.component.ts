import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-empmember-card',
  templateUrl: './empmember-card.component.html',
  styleUrls: ['./empmember-card.component.css'],
})
export class EmpmemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor() {}

  ngOnInit(): void {}
}
