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
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css'],
})
export class RegisterEmpComponent implements OnInit {
  registerEmpForm: FormGroup;
  validationErrors: string[] = [];
  registerCode1: string = 'a';
  registerCode2: string = 'b';
  registerCode3: string = 'c';
  registerCode4: string = 'd';
  registerCode5: string = 'e';
  registerCode6: string = 'f';
  registerCode7: string = 'g';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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

  registerEmp() {
    this.accountService.registerEmp(this.registerEmpForm.value).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
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
