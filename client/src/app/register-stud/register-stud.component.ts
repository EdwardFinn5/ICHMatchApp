import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../_models/category';
import { College } from '../_models/college';
import { Major } from '../_models/major';
import { AccountService } from '../_services/account.service';
import { CollegeService } from '../_services/college.service';
import { MajorService } from '../_services/major.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-register-stud',
  templateUrl: './register-stud.component.html',
  styleUrls: ['./register-stud.component.css'],
})
export class RegisterStudComponent implements OnInit {
  @Output() value: string = '';
  registerStudForm: FormGroup;
  validationErrors: string[] = [];
  categories: Category[];
  majors: Major[];
  colleges: College[];
  registerCode8: string = 'studentconnect';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private majorService: MajorService,
    private collegeService: CollegeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.loadMajors();
    this.loadColleges();
  }

  initializeForm() {
    this.registerStudForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
      registerCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      coLocation: ['', Validators.required],
      stLocation: ['', Validators.required],
      ciLocation: ['', Validators.required],
      classYear: ['Junior', Validators.required],
      category: ['', Validators.required],
      major: ['', Validators.required],
      college: ['', Validators.required],
      gradDate: ['', Validators.required],
    });
    this.registerStudForm.controls.password.valueChanges.subscribe(() => {
      this.registerStudForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  registerStud() {
    this.accountService.registerStud(this.registerStudForm.value).subscribe(
      (response) => {
        console.log('response: ', response);
        // this.cancel();
        this.toastr.success('Registration was successful');
        this.router.navigateByUrl('/member/edit');
        // this.toastr.success('Registration was successful');
      },
      (error) => {
        console.log(error);
        this.validationErrors = error;
      }
    );
  }

  loadCategories() {
    this.majorService.getCategories().subscribe((categories) => {
      this.categories = categories;
      // console.log(this.categories);
    });
  }

  loadMajors() {
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      // console.log(this.categories);
    });
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
      // console.log(this.categories);
    });
  }

  onSelect(categories) {
    // console.log(categories.target.value);
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      // console.log('all majors', majors);
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
      console.log('category id: ', categories.target.value);
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
