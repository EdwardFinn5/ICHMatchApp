import { Component, OnInit, Output } from '@angular/core';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-eds-position-list',
  templateUrl: './eds-position-list.component.html',
  styleUrls: ['./eds-position-list.component.css'],
})
export class EdsPositionListComponent implements OnInit {
  @Output() value: string = '';
  positions: Position[];
  positionId: number;
  members: Member[];

  constructor(private position2Service: Position2Service) {}

  ngOnInit(): void {
    this.loadEdsPositions();
  }

  loadEdsPositions() {
    this.position2Service.getEdsPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
}
