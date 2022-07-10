import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';
import { StudinfoService } from '../_services/studinfo.service';

@Component({
  selector: 'app-positiona-edit-ac-bullets',
  templateUrl: './positiona-edit-ac-bullets.component.html',
  styleUrls: ['./positiona-edit-ac-bullets.component.css'],
})
export class PositionaEditAcBulletsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  studInfo: StudInfo;
  acBullet: AcBullet;
  acBulletId: number;
  studInfoId: number;

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
    private studInfoService: StudinfoService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bulletService: BulletService
  ) {}

  ngOnInit(): void {
    this.loadAcBullet();
    console.log(this.studInfo);
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
        this.router.navigateByUrl(
          '/positionaacbullets/' + this.acBullet.studInfoId
        );
      });
  }

  cancel() {
    this.router.navigateByUrl(
      '/positionaacbullets/' + this.acBullet.studInfoId
    );
  }
}
