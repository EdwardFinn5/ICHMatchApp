import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpIndustry } from '../_models/empIndustry';
import { EmpindustryService } from '../_services/empindustry.service';

@Component({
  selector: 'app-empindustry-list-emps',
  templateUrl: './empindustry-list-emps.component.html',
  styleUrls: ['./empindustry-list-emps.component.css'],
})
export class EmpindustryListEmpsComponent implements OnInit {
  @Input() empIndustries: EmpIndustry[];
  empIndustryId: number;
  @ViewChild('empIndustryForm') empIndustryForm: NgForm;

  constructor(
    private empIndustryService: EmpindustryService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmpIndustries();
  }

  loadEmpIndustries() {
    this.empIndustryService
      .getEmpIndustries()
      .subscribe((empIndustries) => {
        this.empIndustries = empIndustries;
      });
  }

  addEmpIndustry() {
    this.empIndustryService
      .addEmpIndustry(this.empIndustryForm.value)
      .subscribe((empIndustry) => {
        this.empIndustries.push(empIndustry);
        this.toastr.success('Industry Added');
        this.empIndustryForm.reset();
        this.loadEmpIndustries();
      });
  }
}
