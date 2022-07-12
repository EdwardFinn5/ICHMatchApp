import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterCode } from '../_models/registerCode';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-preregister-college-admin',
  templateUrl: './preregister-college-admin.component.html',
  styleUrls: ['./preregister-college-admin.component.css'],
})
export class PreregisterCollegeAdminComponent implements OnInit {
  preregisterCollegeAdminForm: UntypedFormGroup;
  validationErrors: string[] = [];
  registerCode: RegisterCode;
  registerCodeId: number = 1;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRegisterCode();
  }

  initializeForm() {
    this.preregisterCollegeAdminForm = this.fb.group({
      registerCode: ['', Validators.required],
    });
  }

  loadRegisterCode() {
    this.registerCodeService
      .getRegisterCode(this.registerCodeId)
      .subscribe((registerCode: RegisterCode) => {
        this.registerCode = registerCode;
        console.log(registerCode.registerCodeId);
      });
  }

  preregisterCollegeAdmin() {
    this.toastr.success('Register code is valid');
    this.router.navigateByUrl('/registercollegeadmin');
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
