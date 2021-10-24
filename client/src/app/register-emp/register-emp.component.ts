import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  registerEmp() {
    this.accountService.registerEmp(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
        this.router.navigateByUrl('/membersearch');
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
