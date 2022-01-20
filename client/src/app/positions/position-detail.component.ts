import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../_models/position';
import { PositionService } from '../_services/position.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.css'],
})
export class PositionDetailComponent implements OnInit {
  position: Position;
  positionId: number;
  username: string;

  constructor(
    private position2Service: Position2Service,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
      });
  }
}
