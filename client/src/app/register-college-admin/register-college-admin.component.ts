import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { College } from '../_models/college';
import { RegisterCode } from '../_models/registerCode';
import { AccountService } from '../_services/account.service';
import { CollegeService } from '../_services/college.service';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-register-college-admin',
  templateUrl: './register-college-admin.component.html',
  styleUrls: ['./register-college-admin.component.css'],
})
export class RegisterCollegeAdminComponent implements OnInit {
  @Output() value: string = '';
  registerCollegeAdminForm: UntypedFormGroup;
  validationErrors: string[] = [];
  colleges: College[];
  registerCode: RegisterCode;
  registerCodeId: number = 1;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private collegeService: CollegeService,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadColleges();
    this.loadRegisterCode();
  }

  initializeForm() {
    this.registerCollegeAdminForm = this.fb.group({
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
      college: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      hrContactTitle: ['', Validators.required],
    });
    this.registerCollegeAdminForm.controls.password.valueChanges.subscribe(
      () => {
        this.registerCollegeAdminForm.controls.confirmPassword.updateValueAndValidity();
      }
    );
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

  registerCollegeAdmin() {
    console.log('Inside registerCollegeAdmin');
    console.log('values: ', this.registerCollegeAdminForm.value);
    this.accountService
      .registerCollegeAdmin(this.registerCollegeAdminForm.value)
      .subscribe(
        (response) => {
          // console.log('response: ', response);
          // this.cancel();
          this.toastr.success('Registration was successful');
          this.router.navigateByUrl('/member/edit/admin');
          // this.toastr.success('Registration was successful');
        },
        (error) => {
          console.log(error);
          this.validationErrors = error;
        }
      );
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
      // console.log(this.categories);
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
