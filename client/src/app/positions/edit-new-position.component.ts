import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-edit-new-position',
  templateUrl: './edit-new-position.component.html',
  styleUrls: ['./edit-new-position.component.css'],
})
export class EditNewPositionComponent implements OnInit {
  model: any = {};
  @ViewChild('addPositionForm') addPositionForm: NgForm;
  position: Position;
  positionId: number;
  hrUrl?: string = '';
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.addPositionForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private router: Router,
    private position2Service: Position2Service,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private searchMembersService: SearchMembersService,

    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }

  // addPosition() {
  //   this.positionId = +this.route.snapshot.paramMap.get('position');
  //   console.log('position id: ', this.positionId);
  //   if (this.positionId === 0) {
  //     this.position2Service
  //       .addPosition(this.model, this.user.appUserId)
  //       .subscribe(() => {
  //         this.toastr.success('Position info added');

  //         this.addPositionForm.reset(this.model);
  //         // this.router.navigateByUrl('empmember/positions');
  //         this.router.navigateByUrl('/empmember/positions');
  //       });
  //   }
  // }

  addPosition() {
    this.position2Service
      .addPosition(this.model, this.user.appUserId)
      .subscribe(() => {
        this.toastr.success('Position info added');

        this.addPositionForm.reset(this.model);
        // this.router.navigateByUrl('empmember/positions');
        this.router.navigateByUrl('/empmember/positions');
      });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/empmember/positions');
  }
}
