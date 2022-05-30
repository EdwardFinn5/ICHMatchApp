import { Component, OnInit } from '@angular/core';
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
import { RegisterCode } from '../_models/registerCode';
import { AccountService } from '../_services/account.service';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css'],
})
export class RegisterEmpComponent implements OnInit {
  registerEmpForm: FormGroup;
  validationErrors: string[] = [];
  registerCode: RegisterCode;
  // registerCodeName8: string;
  registerCodeId: number = 1;
  // registerCode1: string = 'a';
  // registerCode2: string = 'b';
  // registerCode3: string = 'c';
  // registerCode4: string = 'd';
  // registerCode5: string = 'e';
  // registerCode6: string = 'f';
  // registerCode7: string = 'g';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRegisterCode();
  }

  initializeForm() {
    this.registerEmpForm = this.fb.group({
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
      ciLocation: ['', Validators.required],
      empName: ['', Validators.required],
      hrContactTitle: ['', Validators.required],
      empIndustry: ['', Validators.required],
      employeeNum: ['', Validators.required],
    });
    this.registerEmpForm.controls.password.valueChanges.subscribe(() => {
      this.registerEmpForm.controls.confirmPassword.updateValueAndValidity();
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

  registerEmp() {
    console.log('inside registerEmp');
    console.log('values: ', this.registerEmpForm.value);
    this.accountService.registerEmp(this.registerEmpForm.value).subscribe(
      (response) => {
        // this.cancel();
        this.toastr.success('Registration was successful');
        this.router.navigateByUrl('empmember/edit');
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
