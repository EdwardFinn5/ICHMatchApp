import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css'],
})
export class RegisterEmpComponent implements OnInit {
  model: any = {};

  constructor(private route: Router, private accountService: AccountService) {}

  ngOnInit(): void {}

  registerEmp() {
    this.accountService.registerEmp(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.route.navigateByUrl('/');
  }
}
