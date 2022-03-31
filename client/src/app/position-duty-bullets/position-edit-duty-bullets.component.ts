import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { DutyBullet } from '../_models/dutyBullet';
import { Position } from '../_models/position';
import { BulletService } from '../_services/bullet.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-edit-duty-bullets',
  templateUrl: './position-edit-duty-bullets.component.html',
  styleUrls: ['./position-edit-duty-bullets.component.css'],
})
export class PositionEditDutyBulletsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position[];
  dutyBullet: DutyBullet;
  positionId: number;
  dutyBulletId: number;
  positionName: string;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bulletService: BulletService
  ) {
    this.bulletService.position$
      .pipe(take(1))
      .subscribe((position) => (this.position = position));
  }

  ngOnInit(): void {
    this.loadDutyBullet();
  }

  loadDutyBullet() {
    this.dutyBulletId = +this.route.snapshot.paramMap.get('dutyBulletId');
    console.log('1st dutyBulletId: ', this.dutyBulletId);
    this.bulletService
      .getDutyBullet(this.dutyBulletId)
      .subscribe((dutyBullet) => {
        this.dutyBullet = dutyBullet;
        console.log('3rd dutyBulletId: ', this.dutyBulletId);
      });
  }

  updateDutyBullet() {
    this.dutyBulletId = +this.route.snapshot.paramMap.get('dutyBulletId');
    console.log('1st dutyBulletId: ', this.dutyBulletId);
    this.bulletService
      .updateDutyBullet(this.dutyBullet, this.dutyBulletId)
      .subscribe(() => {
        this.toastr.success('Bullet point updated');
        this.editForm.reset(this.dutyBullet);
        this.router.navigateByUrl(
          '/positiondutybullets/' + this.dutyBullet.positionId
        );
      });
  }

  cancel() {
    this.router.navigateByUrl(
      '/positiondutybullets/' + this.dutyBullet.positionId
    );
  }
}
