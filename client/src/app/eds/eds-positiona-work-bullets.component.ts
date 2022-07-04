import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_models/member';
import { WorkBullet } from '../_models/workBullet';
import { BulletService } from '../_services/bullet.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-eds-positiona-work-bullets',
  templateUrl: './eds-positiona-work-bullets.component.html',
  styleUrls: ['./eds-positiona-work-bullets.component.css'],
})
export class EdsPositionaWorkBulletsComponent implements OnInit {
  member: Member;
  firstName?: string = '';
  appUserId: number;
  @Input() workBullets: WorkBullet[];
  @ViewChild('workBulletForm') workBulletForm: NgForm;
  workBullet: string;
  loading = false;
  workBulletId: number;

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
        this.loadWorkBullets();
      });
  }

  loadWorkBullets() {
    this.bulletService
      .getWorkBullets(this.appUserId)
      .subscribe((workBullets) => {
        this.workBullets = workBullets;
      });
  }

  addWorkBullet() {
    this.bulletService
      .addWorkBullet(this.appUserId, this.workBulletForm.value)
      .subscribe((workBullet) => {
        this.workBullets.push(workBullet);
        this.workBulletForm.reset();
        this.loadWorkBullets();
      });
  }

  deleteWorkBullet(id: number) {
    this.workBulletId = id;
    console.log('workBulletId: ', this.workBulletId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.bulletService.deleteWorkBullet(id).subscribe(() => {
      this.workBullets.splice(
        this.workBullets.findIndex((m) => m.workBulletId === id),
        1
      );
    });
  }
}
