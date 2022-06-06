import { Component, OnInit } from '@angular/core';
import { CiempLocation } from '../_models/ciempLocation';
import { CiLocation } from '../_models/ciLocation';
import { EmpIndustry } from '../_models/empIndustry';
import { StempLocation } from '../_models/stempLocation';
import { StLocation } from '../_models/stLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { CilocationService } from '../_services/cilocation.service';
import { EmpindustryService } from '../_services/empindustry.service';

@Component({
  selector: 'app-step1-register-emp',
  templateUrl: './step1-register-emp.component.html',
  styleUrls: ['./step1-register-emp.component.css'],
})
export class Step1RegisterEmpComponent implements OnInit {
  empIndustries: EmpIndustry[];
  stempLocations: StempLocation[];
  ciempLocations: CiempLocation[];

  constructor(
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService
  ) {}

  ngOnInit(): void {
    this.loadEmpIndustries();
    this.loadStempLocations();
    // this.loadCiLocations();
    // this.loadCiLocations();
  }

  loadEmpIndustries() {
    this.empIndustryService.getEmpIndustries().subscribe((empIndustries) => {
      this.empIndustries = empIndustries;
    });
  }
  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  // loadCiLocations() {
  //   this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
  //     this.ciLocations = ciLocations;
  //   });
  // }

  onSelect(stempLocations) {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
        this.ciempLocations = ciempLocations.filter(
          (s) => s.stempLocationId == stempLocations.target.value
        );
      });
  }
}
