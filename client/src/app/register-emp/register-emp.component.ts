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
import { CiempLocation } from '../_models/ciempLocation';
import { EmpIndustry } from '../_models/empIndustry';
import { RegisterCode } from '../_models/registerCode';
import { StempLocation } from '../_models/stempLocation';
import { AccountService } from '../_services/account.service';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { EmpindustryService } from '../_services/empindustry.service';
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
  registerCodeId: number = 1;
  empIndustries: EmpIndustry[];
  ciempLocations: CiempLocation[];
  stempLocations: StempLocation[];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRegisterCode();
    this.loadEmpIndustries();
    this.loadStempLocations();
    this.loadCiempLocations();
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
      ciempLocation: ['', Validators.required],
      stempLocation: ['', Validators.required],
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

  loadEmpIndustries() {
    this.empIndustryService.getEmpIndustries().subscribe((empIndustries) => {
      this.empIndustries = empIndustries;
    });
  }

  loadCiempLocations() {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
      });
  }

  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  onSelect(stempLocations) {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
        this.ciempLocations = ciempLocations.filter(
          (e) => e.stempLocationId == stempLocations.target.value
        );
      });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
