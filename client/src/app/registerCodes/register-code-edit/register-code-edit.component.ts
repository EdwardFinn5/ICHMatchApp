import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterCode } from 'src/app/_models/registerCode';
import { RegisterCodeService } from 'src/app/_services/register-code.service';

@Component({
  selector: 'app-register-code-edit',
  templateUrl: './register-code-edit.component.html',
  styleUrls: ['./register-code-edit.component.css'],
})
export class RegisterCodeEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  registerCode: RegisterCode;
  registerCodeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private registerCodeService: RegisterCodeService
  ) {}

  ngOnInit(): void {
    this.loadRegisterCode();
  }
  loadRegisterCode() {
    this.registerCodeId = +this.route.snapshot.paramMap.get('registerCodeId');
    this.registerCodeService
      .getRegisterCode(this.registerCodeId)
      .subscribe((registerCode) => {
        this.registerCode = registerCode;
      });
  }

  updateRegisterCode() {
    this.registerCodeId = +this.route.snapshot.paramMap.get('registerCodeId');
    this.registerCodeService
      .updateRegisterCode(this.registerCode, this.registerCodeId)
      .subscribe(() => {
        this.toastr.success('Register codes updated');
        this.editForm.reset(this.registerCode);
        this.router.navigateByUrl('/registercodelist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/registercodelist');
  }
}
