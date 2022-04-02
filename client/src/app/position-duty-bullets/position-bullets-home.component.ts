import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DutyBullet } from '../_models/dutyBullet';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-bullets-home',
  templateUrl: './position-bullets-home.component.html',
  styleUrls: ['./position-bullets-home.component.css'],
})
export class PositionBulletsHomeComponent implements OnInit {
  position: Position;
  positionName?: string = '';
  positionId: number;
  @Input() dutyBullets: DutyBullet[];
  @Input() skillsBullets: SkillsBullet[];
  @ViewChild('dutyBulletForm') dutyBulletForm: NgForm;
  @ViewChild('skillsBulletForm') skillsBulletForm: NgForm;
  dutyBullet: string;
  skillsBullet: string;
  loading = false;

  constructor(
    private bulletService: BulletService,
    private route: ActivatedRoute,
    private position2Service: Position2Service
  ) {}

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
        this.loadSkillsBullets();
      });
  }

  loadDutyBullets() {
    this.bulletService
      .getDutyBullets(this.positionId)
      .subscribe((dutyBullets) => {
        this.dutyBullets = dutyBullets;
      });
  }

  loadSkillsBullets() {
    this.bulletService
      .getSkillsBullets(this.positionId)
      .subscribe((skillsBullets) => {
        this.skillsBullets = skillsBullets;
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

  addSkillsBullet() {
    // this.loading = true;
    this.bulletService
      .addDutyBullet(this.positionId, this.skillsBulletForm.value)
      .subscribe((skillsBullet) => {
        this.dutyBullets.push(skillsBullet);
        this.skillsBulletForm.reset();
        this.loadSkillsBullets();
      });
  }
}
