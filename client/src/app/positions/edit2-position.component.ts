import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { DutyBullet } from '../_models/dutyBullet';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-edit2-position',
  templateUrl: './edit2-position.component.html',
  styleUrls: ['./edit2-position.component.css'],
})
export class Edit2PositionComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position;
  @Input() dutyBullets: DutyBullet[];
  @Input() skillsBullets: SkillsBullet[];
  dutyBullet: string;
  skillsBullet: string;
  loading = false;

  constructor(
    private router: Router,
    private position2Service: Position2Service,
    private toastr: ToastrService,
    private bulletService: BulletService
  ) {
    this.position2Service.currentPosition$
      .pipe(take(1))
      .subscribe((position) => (this.position = position));
  }

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.position2Service
      .getPositionById(this.position.positionId)
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
        this.loadDutyBullets();
        this.loadSkillsBullets();
      });
  }

  loadDutyBullets() {
    this.bulletService
      .getDutyBullets(this.position.positionId)
      .subscribe((dutyBullets) => {
        this.dutyBullets = dutyBullets;
      });
  }

  loadSkillsBullets() {
    this.bulletService
      .getSkillsBullets(this.position.positionId)
      .subscribe((skillsBullets) => {
        this.skillsBullets = skillsBullets;
      });
  }

  updatePosition() {
    this.position2Service
      .updatePosition(this.position, this.position.positionId)
      .subscribe(() => {
        this.toastr.success('Position info updated');
        this.editForm.reset(this.position);
        this.router.navigateByUrl('/empmember/positions');
      });
  }
}
