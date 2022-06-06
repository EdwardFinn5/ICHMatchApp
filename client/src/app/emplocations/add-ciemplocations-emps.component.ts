import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiempLocation } from '../_models/ciempLocation';
import { StempLocation } from '../_models/stempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-add-ciemplocations-emps',
  templateUrl: './add-ciemplocations-emps.component.html',
  styleUrls: ['./add-ciemplocations-emps.component.css'],
})
export class AddCiemplocationsEmpsComponent implements OnInit {
  @Input() ciempLocations: CiempLocation[];
  ciempLocationId: number;
  stempLocationId: number;
  stempLocation: StempLocation;
  @ViewChild('ciempLocationForm') ciempLocationForm: NgForm;

  constructor(
    private router: Router,
    private ciempLocationService: CiemplocationService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStempLocation();
    this.loadCiempLocations();
  }

  loadStempLocation() {
    this.stempLocationId = +this.route.snapshot.paramMap.get('stempLocationId');
    this.ciempLocationService
      .getStempLocation(this.stempLocationId)
      .subscribe((stempLocation) => {
        this.stempLocation = stempLocation;
      });
  }

  loadCiempLocations() {
    this.ciempLocationService
      .getCiempLocationsByStempLocationId(this.stempLocationId)
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
      });
  }

  addCiempLocation() {
    this.ciempLocationService
      .addCiempLocation(this.ciempLocationForm.value, this.stempLocationId)
      .subscribe((ciempLocation) => {
        this.ciempLocations.push(ciempLocation);
        this.toastr.success('City Added');
        this.ciempLocationForm.reset();
        this.loadCiempLocations();
      });
  }
}
