import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-view-skills-bullets',
  templateUrl: './position-view-skills-bullets.component.html',
  styleUrls: ['./position-view-skills-bullets.component.css'],
})
export class PositionViewSkillsBulletsComponent implements OnInit {
  position: Position;
  positionName?: string = '';
  positionId: number;
  @Input() skillsBullets: SkillsBullet[];
  @ViewChild('skillsBulletForm') skillsBulletForm: NgForm;
  skillsBullet: string;
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
        this.loadSkillsBullets();
      });
  }

  loadSkillsBullets() {
    // this.positionId = +this.route.snapshot.paramMap.get('positionId');
    // console.log('1st positionId: ', this.positionId);
    this.bulletService
      .getSkillsBullets(this.positionId)
      .subscribe((skillsBullets) => {
        this.skillsBullets = skillsBullets;
      });
  }

  addSkillsBullet() {
    // this.loading = true;
    this.bulletService
      .addSkillsBullet(this.positionId, this.skillsBulletForm.value)
      .subscribe((skillsBullet) => {
        this.skillsBullets.push(skillsBullet);
        this.skillsBulletForm.reset();
        this.loadSkillsBullets();
      });
  }
}
