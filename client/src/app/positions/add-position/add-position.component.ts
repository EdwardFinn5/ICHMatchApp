import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PositionService } from 'src/app/_services/position.service';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css'],
})
export class AddPositionComponent implements OnInit {
  model: any = {};
  @ViewChild('addPositionForm') addPositionForm: NgForm;
  position: Position;
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
    private positionService: PositionService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  addPosition() {
    this.positionService
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
