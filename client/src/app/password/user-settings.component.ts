import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  updatePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  cnewPassword: FormControl;

  constructor(
    private fb: FormBuilder,
    private acct: AccountService,
    private toastr: ToastrService // private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.oldPassword = new FormControl('', [Validators.required]);
    this.newPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]);
    this.cnewPassword = new FormControl('', [
      Validators.required,
      this.matchValues('newPassword'),
    ]);
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  // anggular and
}
