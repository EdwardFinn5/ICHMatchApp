import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterCode } from 'src/app/_models/registerCode';
import { RegisterCodeService } from 'src/app/_services/register-code.service';

@Component({
  selector: 'app-register-code-list',
  templateUrl: './register-code-list.component.html',
  styleUrls: ['./register-code-list.component.css'],
})
export class RegisterCodeListComponent implements OnInit {
  @Input() registerCodes: RegisterCode[];
  registerCodeId: number;
  @ViewChild('registerCodeForm') registerCodeForm: NgForm;

  constructor(
    private registerCodeService: RegisterCodeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegisterCodes();
  }

  loadRegisterCodes() {
    this.registerCodeService.getRegisterCodes().subscribe((registerCodes) => {
      this.registerCodes = registerCodes;
    });
  }

  addRegisterCode() {
    this.registerCodeService
      .addRegisterCode(this.registerCodeForm.value)
      .subscribe((registerCode) => {
        this.registerCodes.push(registerCode);
        this.toastr.success('Register codes added');
        this.registerCodeForm.reset();
        this.loadRegisterCodes();
      });
  }

  deleteRegisterCode(id: number) {
    this.registerCodeId = id;
    console.log('The next item is register code Id');
    console.log(this.registerCodeId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.registerCodeService.deleteRegisterCode(id).subscribe(() => {
      this.registerCodes.splice(
        this.registerCodes.findIndex((m) => m.registerCodeId === id),
        1
      );
      this.toastr.success('Register codes Deleted');
    });
  }
}
