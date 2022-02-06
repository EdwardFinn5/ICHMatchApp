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
  selector: 'app-register-stud',
  templateUrl: './register-stud.component.html',
  styleUrls: ['./register-stud.component.css'],
})
export class RegisterStudComponent implements OnInit {
  model: any = {};
  registerStudForm: FormGroup;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerStudForm = new FormGroup({
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
      classYear: new FormControl(),
      major: new FormControl(),
      college: new FormControl(),
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
    console.log(this.registerStudForm.value);
    // this.accountService.registerStud(this.model).subscribe(
    //   (response) => {
    //     console.log('response: ', response);
    //     this.cancel();
    //     this.router.navigateByUrl('/positionslist');
    //     this.toastr.success('Registration was successful');
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
