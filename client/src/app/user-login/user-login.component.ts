import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/members');
        this.loggedIn = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
