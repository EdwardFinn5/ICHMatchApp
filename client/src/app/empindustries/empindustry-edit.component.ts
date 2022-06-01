import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpIndustry } from '../_models/empIndustry';
import { EmpindustryService } from '../_services/empindustry.service';

@Component({
  selector: 'app-empindustry-edit',
  templateUrl: './empindustry-edit.component.html',
  styleUrls: ['./empindustry-edit.component.css'],
})
export class EmpindustryEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  empIndustry: EmpIndustry;
  empIndustryId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private empIndustryService: EmpindustryService
  ) {}

  ngOnInit(): void {
    this.loadEmpIndustry();
  }

  loadEmpIndustry() {
    this.empIndustryId = +this.route.snapshot.paramMap.get('empIndustryId');
    this.empIndustryService
      .getEmpIndustry(this.empIndustryId)
      .subscribe((empIndustry) => {
        this.empIndustry = empIndustry;
      });
  }

  updateEmpIndustry() {
    this.empIndustryId = +this.route.snapshot.paramMap.get('empIndustryId');
    this.empIndustryService
      .updateEmpIndustry(this.empIndustry, this.empIndustryId)
      .subscribe(() => {
        this.toastr.success('Industry Updated');
        this.editForm.reset(this.empIndustry);
        this.router.navigateByUrl('/empindustrylist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/empindustrylist');
  }
}
