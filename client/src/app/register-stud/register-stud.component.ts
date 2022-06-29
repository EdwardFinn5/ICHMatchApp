import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../_models/category';
import { CiLocation } from '../_models/ciLocation';
import { College } from '../_models/college';
import { CoLocation } from '../_models/coLocation';
import { Major } from '../_models/major';
import { RegisterCode } from '../_models/registerCode';
import { StLocation } from '../_models/stLocation';
import { AccountService } from '../_services/account.service';
import { CilocationService } from '../_services/cilocation.service';
import { CollegeService } from '../_services/college.service';
import { MajorService } from '../_services/major.service';
import { MembersService } from '../_services/members.service';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-register-stud',
  templateUrl: './register-stud.component.html',
  styleUrls: ['./register-stud.component.css'],
})
export class RegisterStudComponent implements OnInit {
  @Output() value: string = '';
  registerStudForm: UntypedFormGroup;
  validationErrors: string[] = [];
  categories: Category[];
  majors: Major[];
  coLocations: CoLocation[];
  stLocations: StLocation[];
  ciLocations: CiLocation[];
  colleges: College[];
  registerCode: RegisterCode;
  // registerCodeName8: string;
  registerCodeId: number = 1;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private majorService: MajorService,
    private collegeService: CollegeService,
    private ciLocationService: CilocationService,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.loadMajors();
    this.loadCoLocations();
    this.loadStLocations();
    this.loadCiLocations();
    this.loadColleges();
    this.loadRegisterCode();
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
      // gradDate: ['', Validators.required],
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

  loadRegisterCode() {
    this.registerCodeService
      .getRegisterCode(this.registerCodeId)
      .subscribe((registerCode: RegisterCode) => {
        this.registerCode = registerCode;
        console.log(registerCode.registerCodeId);
      });
  }

  registerStud() {
    console.log('Inside registerStud');
    console.log('values: ', this.registerStudForm.value);
    this.accountService.registerStud(this.registerStudForm.value).subscribe(
      (response) => {
        // console.log('response: ', response);
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

  loadCiLocations() {
    this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
      this.ciLocations = ciLocations;
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

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
