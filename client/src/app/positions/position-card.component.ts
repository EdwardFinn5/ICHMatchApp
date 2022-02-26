import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.css'],
})
export class PositionCardComponent implements OnInit {
  @Input() position: Position;
  @Input() member: Member;

  constructor(
    private position2Service: Position2Service,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addLike(position: Position) {
    this.position2Service.addLike(position.appUserId).subscribe(() => {
      this.toastr.success(
        'You have indicated ' + position.empName + ' might be a good fit'
      );
    });
  }
}
