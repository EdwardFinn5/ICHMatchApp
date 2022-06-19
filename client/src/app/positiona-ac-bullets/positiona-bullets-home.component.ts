import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcBullet } from '../_models/acBullet';
import { StudInfo } from '../_models/studinfo';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { StudinfoService } from '../_services/studinfo.service';

@Component({
  selector: 'app-positiona-bullets-home',
  templateUrl: './positiona-bullets-home.component.html',
  styleUrls: ['./positiona-bullets-home.component.css'],
})
export class PositionaBulletsHomeComponent implements OnInit {
  studInfo: StudInfo;
  studInfoId: number;
  @Input() acBullets: AcBullet[];
  @Input() workBullets: WorkBullet[];
  @ViewChild('acBulletForm') acBulletForm: NgForm;
  @ViewChild('workBulletForm') workBulletForm: NgForm;
  acBullet: string;
  workBullet: string;
  loading = false;

  constructor(
    private bulletService: BulletService,
    private route: ActivatedRoute,
    private studInfoService: StudinfoService
  ) {}

  ngOnInit(): void {
    this.loadStudInfo();
  }

  loadStudInfo() {
    this.studInfoId = +this.route.snapshot.paramMap.get('studInfoId');
    console.log('1st studInfoId: ', this.studInfoId);
    this.studInfoService
      .getStudInfoById(+this.route.snapshot.paramMap.get('studInfoId'))
      .subscribe((studInfo) => {
        this.studInfo = studInfo;
        this.loadAcBullets();
        this.loadWorkBullets();
      });
  }

  loadAcBullets() {
    this.bulletService.getAcBullets(this.studInfoId).subscribe((acBullets) => {
      this.acBullets = acBullets;
    });
  }

  loadWorkBullets() {
    this.bulletService
      .getWorkBullets(this.studInfoId)
      .subscribe((workBullets) => {
        this.workBullets = workBullets;
      });
  }

  addAcBullet() {
    // this.loading = true;
    this.bulletService
      .addAcBullet(this.studInfoId, this.acBulletForm.value)
      .subscribe((acBullet) => {
        this.acBullets.push(acBullet);
        this.acBulletForm.reset();
        this.loadAcBullets();
      });
  }

  addWorkBullet() {
    // this.loading = true;
    this.bulletService
      .addWorkBullet(this.studInfoId, this.workBulletForm.value)
      .subscribe((workBullet) => {
        this.workBullets.push(workBullet);
        this.workBulletForm.reset();
        this.loadWorkBullets();
      });
  }
}
