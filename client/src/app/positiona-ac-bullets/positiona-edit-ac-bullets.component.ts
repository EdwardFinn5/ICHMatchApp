import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-positiona-edit-ac-bullets',
  templateUrl: './positiona-edit-ac-bullets.component.html',
  styleUrls: ['./positiona-edit-ac-bullets.component.css'],
})
export class PositionaEditAcBulletsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  acBullet: AcBullet;
  acBulletId: number;

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
    this.loadAcBullet();
  }

  loadAcBullet() {
    this.acBulletId = +this.route.snapshot.paramMap.get('acBulletId');
    console.log('1st acBulletId: ', this.acBulletId);
    this.bulletService.getAcBullet(this.acBulletId).subscribe((acBullet) => {
      this.acBullet = acBullet;
      console.log('3rd acBulletId: ', this.acBulletId);
    });
  }

  updateAcBullet() {
    this.acBulletId = +this.route.snapshot.paramMap.get('acBulletId');
    console.log('1st acBulletId: ', this.acBulletId);
    this.bulletService
      .updateAcBullet(this.acBullet, this.acBulletId)
      .subscribe(() => {
        this.toastr.success('Bullet point updated');
        this.editForm.reset(this.acBullet);
        this.router.navigateByUrl('/positionaacbullets/' + this.user.appUserId);
      });
  }

  cancel() {
    this.router.navigateByUrl('/positionaacbullets/' + this.user.appUserId);
  }
}
