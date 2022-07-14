import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean = false;
  appUserType: string;
  user: User;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.toastr.success('Login was successful');
      console.log('response in login: ', response);
      this.user = response;
      this.appUserType = this.user.appUserType;
      console.log('user in login', this.user);
      console.log('appUserType: ', this.appUserType);
      if (this.appUserType == 'EmpHr') {
        console.log('this is navigate user type: ', this.appUserType);
        this.router.navigateByUrl('/membersearch');
      } else if (this.appUserType == 'ColStudent') {
        console.log('this is navigate user type: ', this.appUserType);
        this.router.navigateByUrl('/positionslist');
      } else if (this.appUserType == 'CollegeAdmin') {
        console.log('this is navigate user type: ', this.appUserType);
        this.router.navigateByUrl('/membersearchadmin');
      }

      // if ((this.appUserType = 'EmpHr')) {
      //   this.router.navigateByUrl('/positionslist');
      // }
      // this.loggedIn = true;
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
