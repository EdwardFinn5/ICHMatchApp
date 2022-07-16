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
import { RegisterCode } from '../_models/registerCode';
import { AccountService } from '../_services/account.service';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-register-portal-admin',
  templateUrl: './register-portal-admin.component.html',
  styleUrls: ['./register-portal-admin.component.css'],
})
export class RegisterPortalAdminComponent implements OnInit {
  @Output() value: string = '';
  registerPortalAdminForm: UntypedFormGroup;
  validationErrors: string[] = [];
  registerCode: RegisterCode;
  registerCodeId: number = 1;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRegisterCode();
  }

  initializeForm() {
    this.registerPortalAdminForm = this.fb.group({
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
      hrContactTitle: ['', Validators.required],
    });
    this.registerPortalAdminForm.controls.password.valueChanges.subscribe(
      () => {
        this.registerPortalAdminForm.controls.confirmPassword.updateValueAndValidity();
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

  registerPortalAdmin() {
    console.log('Inside registerCollegeAdmin');
    console.log('values: ', this.registerPortalAdminForm.value);
    this.accountService
      .registerPortalAdmin(this.registerPortalAdminForm.value)
      .subscribe(
        (response) => {
          // console.log('response: ', response);
          // this.cancel();
          this.toastr.success('Registration was successful');
          this.router.navigateByUrl('/edsstudentmembers');
          // this.toastr.success('Registration was successful');
        },
        (error) => {
          console.log(error);
          this.validationErrors = error;
        }
      );
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
