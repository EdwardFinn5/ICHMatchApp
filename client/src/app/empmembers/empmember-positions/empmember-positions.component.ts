import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PositionService } from 'src/app/_services/position.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-positions',
  templateUrl: './empmember-positions.component.html',
  styleUrls: ['./empmember-positions.component.css'],
})
export class EmpmemberPositionsComponent implements OnInit {
  member: Member;
  user: User;
  positions: Position[];
  positionId: number;

  constructor(
    private accountService: AccountService,
    private searchMembersService: SearchMembersService,
    private positionService: PositionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadPositions();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMemberById(this.user.appUserId)
      .subscribe((member) => {
        this.member = member;
        console.log(member.appUserId);
      });
  }

  loadPositions() {
    this.positionService
      .getPositions(this.user.appUserId)
      .subscribe((positions) => {
        this.positions = positions;
      });
  }

  deletePosition(id: number) {
    this.positionId = id;
    console.log('The next item is positionId');
    console.log(this.positionId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.positionService.deletePosition(id).subscribe(() => {
      this.positions.splice(
        this.positions.findIndex((m) => m.positionId === id),
        1
      );
    });
  }

  editPosition(id: number) {
    console.log('the next number is id');
    console.log(id);

    // this.router.navigate(['/positions/GetPositionById/' + id]);
    this.router.navigate(['/positions/GetPositionById/', id]);
  }

  // updatePosition(id: number) {
  // this.confirmService
  //   .confirm('Confirm delete message', 'This cannot be undone')
  //   .subscribe((result) => {
  //     if (result) {
  //   this.positionService.updatePosition(id).subscribe(() => {
  //     this.positions.splice(
  //       this.positions.findIndex((m) => m.positionId === id),
  //       1
  //     );
  //   });
  // }
}
