import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
  model: any = {};
  registerEmpForm: FormGroup;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerEmpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      location: new FormControl(),
      givingLevel: new FormControl(),
      empName: new FormControl(),
      empIndustry: new FormControl(),
      employeeNum: new FormControl(),
      registerCode: new FormControl(),
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
    console.log(this.registerEmpForm.value);
    // this.accountService.registerEmp(this.model).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.cancel();
    //     this.router.navigateByUrl('/membersearch');
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error(error.error);
    //   }
    // );
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
