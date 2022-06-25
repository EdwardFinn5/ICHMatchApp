import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcBullet } from '../_models/acBullet';
import { Member } from '../_models/member';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-positiona-ac-bullets',
  templateUrl: './positiona-ac-bullets.component.html',
  styleUrls: ['./positiona-ac-bullets.component.css'],
})
export class PositionaAcBulletsComponent implements OnInit {
  member: Member;
  firstName?: string = '';
  appUserId: number;
  @Input() acBullets: AcBullet[];
  @ViewChild('acBulletForm') acBulletForm: NgForm;
  acBullet: string;
  loading = false;
  acBulletId: number;

  constructor(
    private bulletService: BulletService,
    private route: ActivatedRoute,
    private searchMemberService: SearchMembersService
  ) {}

  ngOnInit(): void {
    this.loadSearchMember();
  }

  loadSearchMember() {
    this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
    console.log('1st appUserId: ', this.appUserId);
    this.searchMemberService
      .getSearchMemberById(+this.route.snapshot.paramMap.get('appUserId'))
      .subscribe((member) => {
        this.member = member;
        this.firstName = member.firstName;
        console.log('appUserId: ', member.appUserId);
        this.loadAcBullets();
      });
  }

  loadAcBullets() {
    this.bulletService.getAcBullets(this.appUserId).subscribe((acBullets) => {
      this.acBullets = acBullets;
    });
  }

  addAcBullet() {
    this.bulletService
      .addAcBullet(this.appUserId, this.acBulletForm.value)
      .subscribe((acBullet) => {
        this.acBullets.push(acBullet);
        this.acBulletForm.reset();
        this.loadAcBullets();
      });
  }

  deleteAcBullet(id: number) {
    this.acBulletId = id;
    console.log('acBulletId: ', this.acBulletId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.bulletService.deleteAcBullet(id).subscribe(() => {
      this.acBullets.splice(
        this.acBullets.findIndex((m) => m.acBulletId === id),
        1
      );
    });
  }
}
