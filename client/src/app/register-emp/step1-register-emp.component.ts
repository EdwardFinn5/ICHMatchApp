import { Component, OnInit } from '@angular/core';
import { CiLocation } from '../_models/ciLocation';
import { EmpIndustry } from '../_models/empIndustry';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';
import { EmpindustryService } from '../_services/empindustry.service';

@Component({
  selector: 'app-step1-register-emp',
  templateUrl: './step1-register-emp.component.html',
  styleUrls: ['./step1-register-emp.component.css'],
})
export class Step1RegisterEmpComponent implements OnInit {
  empIndustries: EmpIndustry[];
  stLocations: StLocation[];
  ciLocations: CiLocation[];

  constructor(
    private empIndustryService: EmpindustryService,
    private ciLocationService: CilocationService
  ) {}

  ngOnInit(): void {
    this.loadEmpIndustries();
    this.loadStLocations();
    // this.loadCiLocations();
    // this.loadCiLocations();
  }

  loadEmpIndustries() {
    this.empIndustryService.getEmpIndustries().subscribe((empIndustries) => {
      this.empIndustries = empIndustries;
    });
  }
  loadStLocations() {
    this.ciLocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
    });
  }

  // loadCiLocations() {
  //   this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
  //     this.ciLocations = ciLocations;
  //   });
  // }

  onSelect(stLocations) {
    this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
      this.ciLocations = ciLocations;
      this.ciLocations = ciLocations.filter(
        (s) => s.stLocationId == stLocations.target.value
      );
    });
  }
}
