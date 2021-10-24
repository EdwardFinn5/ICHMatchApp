import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-search-card',
  templateUrl: './member-search-card.component.html',
  styleUrls: ['./member-search-card.component.css'],
})
export class MemberSearchCardComponent implements OnInit {
  @Input() member: Member;

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
