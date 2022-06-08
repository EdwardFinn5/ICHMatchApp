import { createOutput } from '@angular/compiler/src/core';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/_models/category';
import { College } from 'src/app/_models/college';
import { Major } from 'src/app/_models/major';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CollegeService } from 'src/app/_services/college.service';
import { MajorService } from 'src/app/_services/major.service';
import { MembersService } from 'src/app/_services/members.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-edit-cardnphoto',
  templateUrl: './member-edit-cardnphoto.component.html',
  styleUrls: ['./member-edit-cardnphoto.component.css'],
})
export class MemberEditCardnphotoComponent implements OnInit {
  @Output() value: string = '';
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  colleges: College[];
  categories: Category[];
  majors: Major[];
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
    private collegeService: CollegeService,
    private majorService: MajorService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadColleges();
    this.loadCategories();
    // this.loadMajors();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
      });
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
      // console.log(this.categories);
    });
  }

  loadCategories() {
    this.majorService.getCategories().subscribe((categories) => {
      this.categories = categories;
      // console.log(this.categories);
    });
  }

  // loadMajors() {
  //   this.majorService.getMajors().subscribe((majors) => {
  //     this.majors = majors;
  //     // console.log(this.categories);
  //   });
  // }

  onSelect(categories) {
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
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
