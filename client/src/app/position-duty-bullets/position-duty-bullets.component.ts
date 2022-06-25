import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DutyBullet } from '../_models/dutyBullet';
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
  position: Position;
  positionName?: string = '';
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  @ViewChild('dutyBulletForm') dutyBulletForm: NgForm;
  dutyBullet: string;
  loading = false;
  dutyBulletId: number;

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
      .getDutyBullets(this.positionId)
      .subscribe((dutyBullets) => {
        this.dutyBullets = dutyBullets;
      });
  }

  addDutyBullet() {
    // this.loading = true;
    this.bulletService
      .addDutyBullet(this.positionId, this.dutyBulletForm.value)
      .subscribe((dutyBullet) => {
        this.dutyBullets.push(dutyBullet);
        this.dutyBulletForm.reset();
        this.loadDutyBullets();
      });
  }

  deleteDutyBullet(id: number) {
    this.dutyBulletId = id;
    console.log('dutyBulletId: ', this.dutyBulletId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.bulletService.deleteDutyBullet(id).subscribe(() => {
      this.dutyBullets.splice(
        this.dutyBullets.findIndex((m) => m.dutyBulletId === id),
        1
      );
    });
  }
}
