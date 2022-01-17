import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Position } from '../_models/position';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.css'],
})
export class PositionCardComponent implements OnInit {
  @Input() position: Position;
  @Input() member: Member;

  constructor() {}

  ngOnInit(): void {}
}
