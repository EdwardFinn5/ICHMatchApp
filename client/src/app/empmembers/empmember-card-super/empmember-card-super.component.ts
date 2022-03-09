import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-card-super',
  templateUrl: './empmember-card-super.component.html',
  styleUrls: ['./empmember-card-super.component.css'],
})
export class EmpmemberCardSuperComponent implements OnInit {
  @Input() member: Member;

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
