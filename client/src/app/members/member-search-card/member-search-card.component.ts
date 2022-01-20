import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';

@Component({
  selector: 'app-member-search-card',
  templateUrl: './member-search-card.component.html',
  styleUrls: ['./member-search-card.component.css'],
})
export class MemberSearchCardComponent implements OnInit {
  @Input() member: Member;
  @Input() position: Position[] = [];

  constructor() {}

  ngOnInit(): void {}

  addLike(member: Member) {
    // this.memberService.addLike(member.username).subscribe(() => {
    //   this.toastr.success(
    //     'You have indicated ' + member.firstName + ' might be a good fit'
    //   );
    // });
  }
}
