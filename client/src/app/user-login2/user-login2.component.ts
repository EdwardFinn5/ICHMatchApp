import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-login2',
  templateUrl: './user-login2.component.html',
  styleUrls: ['./user-login2.component.css'],
})
export class UserLogin2Component implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.loggedIn = false;
  }
}
