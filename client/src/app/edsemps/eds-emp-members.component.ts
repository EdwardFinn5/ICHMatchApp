import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-eds-emp-members',
  templateUrl: './eds-emp-members.component.html',
  styleUrls: ['./eds-emp-members.component.css'],
})
export class EdsEmpMembersComponent implements OnInit {
  members: Member[];
  appUserId: number;

  constructor(private searchMemberService: SearchMembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService.getEdsEmpSearchMembers().subscribe((members) => {
      this.members = members;
    });
  }

  deleteMember(id: number) {
    this.appUserId = id;
    console.log('The next item is appUserId');
    console.log(this.appUserId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.searchMemberService.deleteSearchMember(id).subscribe(() => {
      this.members.splice(
        this.members.findIndex((m) => m.appUserId === id),
        1
      );
    });
  }
}
