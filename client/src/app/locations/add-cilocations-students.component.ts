import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiLocation } from '../_models/ciLocation';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-add-cilocations-students',
  templateUrl: './add-cilocations-students.component.html',
  styleUrls: ['./add-cilocations-students.component.css'],
})
export class AddCilocationsStudentsComponent implements OnInit {
  @Input() ciLocations: CiLocation[];
  ciLocationId: number;
  stLocationId: number;
  stLocation: StLocation;
  @ViewChild('ciLocationForm') ciLocationForm: NgForm;

  constructor(
    private router: Router,
    private ciLocationService: CilocationService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStLocation();
    this.loadCiLocations();
  }

  loadStLocation() {
    this.stLocationId = +this.route.snapshot.paramMap.get('stLocationId');
    this.ciLocationService
      .getStLocation(this.stLocationId)
      .subscribe((stLocation) => {
        this.stLocation = stLocation;
      });
  }

  loadCiLocations() {
    this.ciLocationService
      .getCiLocationsByStLocationId(this.stLocationId)
      .subscribe((ciLocations) => {
        this.ciLocations = ciLocations;
      });
  }

  addCiLocation() {
    this.ciLocationService
      .addCiLocation(this.ciLocationForm.value, this.stLocationId)
      .subscribe((ciLocation) => {
        this.ciLocations.push(ciLocation);
        this.toastr.success('City Added');
        this.ciLocationForm.reset();
        this.loadCiLocations();
      });
  }
}
