import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { WorkBullet } from '../_models/workBullet';
import { AccountService } from '../_services/account.service';
import { BulletService } from '../_services/bullet.service';

@Component({
  selector: 'app-positiona-edit-work-bullets',
  templateUrl: './positiona-edit-work-bullets.component.html',
  styleUrls: ['./positiona-edit-work-bullets.component.css'],
})
export class PositionaEditWorkBulletsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  workBullet: WorkBullet;
  workBulletId: number;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bulletService: BulletService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadWorkBullet();
  }

  loadWorkBullet() {
    this.workBulletId = +this.route.snapshot.paramMap.get('workBulletId');
    console.log('1st workBulletId: ', this.workBulletId);
    this.bulletService
      .getWorkBullet(this.workBulletId)
      .subscribe((workBullet) => {
        this.workBullet = workBullet;
        console.log('3rd workBulletId: ', this.workBulletId);
      });
  }

  updateWorkBullet() {
    this.workBulletId = +this.route.snapshot.paramMap.get('workBulletId');
    console.log('1st workBulletId: ', this.workBulletId);
    this.bulletService
      .updateWorkBullet(this.workBullet, this.workBulletId)
      .subscribe(() => {
        this.toastr.success('Bullet point updated');
        this.editForm.reset(this.workBullet);
        this.router.navigateByUrl(
          '/positionaworkbullets/' + this.user.appUserId
        );
      });
  }

  cancel() {
    this.router.navigateByUrl('/positionaworkbullets/' + this.user.appUserId);
  }
}
