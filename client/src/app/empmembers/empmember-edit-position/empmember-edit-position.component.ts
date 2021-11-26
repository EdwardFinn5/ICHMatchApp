import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Position } from 'src/app/_models/position';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-edit-position',
  templateUrl: './empmember-edit-position.component.html',
  styleUrls: ['./empmember-edit-position.component.css'],
})
export class EmpmemberEditPositionComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountservice: AccountService,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService
  ) {
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.searchMembersService
      .getPosition(this.user.appUserId)
      .subscribe((position: Position) => {
        this.position = position;
        console.log(position.appUserId);
      });
  }

  updatePosition() {
    console.log(this.position);
    this.toastr.success('Position info updated');
    this.editForm.reset(this.position);
  }
}
