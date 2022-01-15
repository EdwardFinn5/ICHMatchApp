import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Position } from 'src/app/_models/position';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PositionService } from 'src/app/_services/position.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css'],
})
export class EditPositionComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position;
  user: User;
  id: number;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountservice: AccountService,
    private positionService: PositionService,
    private toastr: ToastrService
  ) {
    this.positionService.currentPosition$
      .pipe(take(1))
      .subscribe((position) => (this.position = position));
    this.id = this.position.positionId;
    console.log('in the edit position component here is id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionService
      .getPosition(this.position.positionId)
      .subscribe((position: Position) => {
        this.position = position;
        console.log(position.positionId);
      });
  }

  updatePosition() {
    this.positionService
      .updatePosition(this.position, this.position.positionId)
      .subscribe(() => {
        this.toastr.success('Position info updated');
        this.editForm.reset(this.position);
      });
  }
}
