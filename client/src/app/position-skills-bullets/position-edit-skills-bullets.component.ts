import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BulletService } from '../_services/bullet.service';

@Component({
  selector: 'app-position-edit-skills-bullets',
  templateUrl: './position-edit-skills-bullets.component.html',
  styleUrls: ['./position-edit-skills-bullets.component.css'],
})
export class PositionEditSkillsBulletsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position[];
  skillsBullet: SkillsBullet;
  positionId: number;
  skillsBulletId: number;
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
    this.loadSkillsBullet();
  }

  loadSkillsBullet() {
    this.skillsBulletId = +this.route.snapshot.paramMap.get('skillsBulletId');
    console.log('1st skillsBulletId: ', this.skillsBulletId);
    this.bulletService
      .getSkillsBullet(this.skillsBulletId)
      .subscribe((skillsBullet) => {
        this.skillsBullet = skillsBullet;
        console.log('3rd skillsBulletId: ', this.skillsBulletId);
      });
  }

  updateSkillsBullet() {
    this.skillsBulletId = +this.route.snapshot.paramMap.get('skillsBulletId');
    console.log('1st skillsBulletId: ', this.skillsBulletId);
    this.bulletService
      .updateSkillsBullet(this.skillsBullet, this.skillsBulletId)
      .subscribe(() => {
        this.toastr.success('Bullet point updated');
        this.editForm.reset(this.skillsBullet);
        this.router.navigateByUrl(
          '/positionskillsbullets/' + this.skillsBullet.positionId
        );
      });
  }

  cancel() {
    this.router.navigateByUrl(
      '/positionskillsbullets/' + this.skillsBullet.positionId
    );
  }
}
