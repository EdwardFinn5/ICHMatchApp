import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterCode } from '../_models/registerCode';
import { RegisterCodeService } from '../_services/register-code.service';

@Component({
  selector: 'app-preregister-stud',
  templateUrl: './preregister-stud.component.html',
  styleUrls: ['./preregister-stud.component.css'],
})
export class PreregisterStudComponent implements OnInit {
  @Output() value: string = '';
  preregisterStudForm: FormGroup;
  validationErrors: string[] = [];
  registerCode: RegisterCode;
  registerCodeName8: string;
  registerCodeId: number = 1;

  constructor(
    private router: Router,
    // private accountService: AccountService,
    // private majorService: MajorService,
    // private collegeService: CollegeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRegisterCode();
  }

  initializeForm() {
    this.preregisterStudForm = this.fb.group({
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

  preregisterStud() {
    this.toastr.success('Registration was successful');
    this.router.navigateByUrl('/step1registerstud');
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
