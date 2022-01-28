import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  appuserType: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/membersearch');
      this.loggedIn = true;
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
