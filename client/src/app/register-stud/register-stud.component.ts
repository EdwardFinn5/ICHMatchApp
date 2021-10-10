import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-stud',
  templateUrl: './register-stud.component.html',
  styleUrls: ['./register-stud.component.css'],
})
export class RegisterStudComponent implements OnInit {
  model: any = {};

  constructor(
    private route: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  registerStud() {
    this.accountService.registerStud(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.route.navigateByUrl('/');
  }
}
