import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css'],
})
export class PositionsListComponent implements OnInit {
  positions: Position[];
  member: Member;

  constructor(private position2Service: Position2Service) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions() {
    this.position2Service.getPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
}
