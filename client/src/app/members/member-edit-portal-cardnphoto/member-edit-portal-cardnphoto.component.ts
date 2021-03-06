import {
  Component,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-edit-portal-cardnphoto',
  templateUrl: './member-edit-portal-cardnphoto.component.html',
  styleUrls: ['./member-edit-portal-cardnphoto.component.css'],
})
export class MemberEditPortalCardnphotoComponent implements OnInit {
  @Output() value: string = '';
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }

  updateMemberCard() {
    this.searchMembersService.updateMemberCard(this.member).subscribe(() => {
      console.log(this.member);
      this.toastr.success('Card info updated');
      this.editForm.reset(this.member);
      // this.router.navigateByUrl('/member/edit');
    });
  }
}
