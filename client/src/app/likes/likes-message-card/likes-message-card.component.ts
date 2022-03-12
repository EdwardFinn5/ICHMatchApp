import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Position } from 'src/app/_models/position';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-likes-message-card',
  templateUrl: './likes-message-card.component.html',
  styleUrls: ['./likes-message-card.component.css'],
})
export class LikesMessageCardComponent implements OnInit {
  @Input() member: Member;
  @Input() position: Position[] = [];

  constructor(
    private searchMemberService: SearchMembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.searchMemberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have given a thumbs-up to ' + member.firstName);
    });
  }
}
