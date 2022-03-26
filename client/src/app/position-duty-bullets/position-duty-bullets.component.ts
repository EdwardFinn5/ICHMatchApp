import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DutyBullet } from '../_models/DutyBullet';
import { Position } from '../_models/position';
import { BulletService } from '../_services/bullet.service';
import { PositionService } from '../_services/position.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-duty-bullets',
  templateUrl: './position-duty-bullets.component.html',
  styleUrls: ['./position-duty-bullets.component.css'],
})
export class PositionDutyBulletsComponent implements OnInit {
  // @ViewChild('bulletsE1') message: ElementRef;
  // scrollTop: number = null;
  position: Position;
  positionName?: string = '';
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  @ViewChild('dutyBulletForm') dutyBulletForm: NgForm;
  dutyBullet: string;
  loading = false;

  constructor(
    private bulletService: BulletService,
    private route: ActivatedRoute,
    private position2Service: Position2Service
  ) {
    // this.positionService.currentPosition$
    //   .pipe(take(1))
    //   .subscribe((position) => (this.position = position));
  }

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('1st positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        this.positionName = position.positionName;
        console.log('positionId: ', position.positionId);
        this.loadDutyBullets();
      });
  }

  loadDutyBullets() {
    // this.positionId = +this.route.snapshot.paramMap.get('positionId');
    // console.log('1st positionId: ', this.positionId);
    this.bulletService
      .getdutyBullets(this.positionId)
      .subscribe((dutyBullets) => {
        this.dutyBullets = dutyBullets;
      });
  }

  addDutyBullet() {
    // this.loading = true;
    this.bulletService
      .addDutyBullet(this.positionId, this.dutyBullet)
      .subscribe((dutyBullet) => {
        this.dutyBullets.push(dutyBullet);
        this.dutyBulletForm.reset();
      });
  }
}
