import { Component, OnInit } from '@angular/core';
import { PositionaWorkBulletsComponent } from '../positiona-work-bullets/positiona-work-bullets.component';
import { Position } from '../_models/position';

@Component({
  selector: 'app-edit-position-card',
  templateUrl: './edit-position-card.component.html',
  styleUrls: ['./edit-position-card.component.css'],
})
export class EditPositionCardComponent implements OnInit {
  position: Position;

  constructor() {}

  ngOnInit(): void {}
}
