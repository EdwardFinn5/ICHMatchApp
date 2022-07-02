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
import { Category } from '../_models/category';
import { CiLocation } from '../_models/ciLocation';
import { College } from '../_models/college';
import { CoLocation } from '../_models/coLocation';
import { Major } from '../_models/major';
import { Member } from '../_models/member';
import { StLocation } from '../_models/stLocation';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CilocationService } from '../_services/cilocation.service';
import { CollegeService } from '../_services/college.service';
import { MajorService } from '../_services/major.service';
import { SearchMembersService } from '../_services/search-members.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-student-cardnphoto-edit',
  templateUrl: './student-cardnphoto-edit.component.html',
  styleUrls: ['./student-cardnphoto-edit.component.css'],
})
export class StudentCardnphotoEditComponent implements OnInit {
  @Output() value: string = '';
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  colleges: College[];
  categories: Category[];
  majors: Major[];
  coLocations: CoLocation[];
  stLocations: StLocation[];
  ciLocations: CiLocation[];

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
    private ciLocationService: CilocationService,
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
    this.loadCoLocations();
    this.loadStLocations();
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

  loadCoLocations() {
    this.ciLocationService.getCoLocations().subscribe((coLocations) => {
      this.coLocations = coLocations;
    });
  }

  loadStLocations() {
    this.ciLocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
    });
  }

  onSelect(categories) {
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
    });
  }

  onSelectCountry(coLocations) {
    this.ciLocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
      this.stLocations = stLocations.filter(
        (e) => e.coLocationId == coLocations.target.value
      );
    });
  }

  onSelectState(stLocations) {
    this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
      this.ciLocations = ciLocations;
      this.ciLocations = ciLocations.filter(
        (e) => e.stLocationId == stLocations.target.value
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
