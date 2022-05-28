import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoLocation } from '../_models/coLocation';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-add-stlocations-students',
  templateUrl: './add-stlocations-students.component.html',
  styleUrls: ['./add-stlocations-students.component.css'],
})
export class AddStlocationsStudentsComponent implements OnInit {
  @Input() stLocations: StLocation[];
  stLocationId: number;
  coLocationId: number;
  coLocation: CoLocation;
  @ViewChild('stLocationForm') stLocationForm: NgForm;

  constructor(
    private router: Router,
    private ciLocationService: CilocationService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCoLocation();
    this.loadStLocations();
  }

  loadCoLocation() {
    this.coLocationId = +this.route.snapshot.paramMap.get('coLocationId');
    this.ciLocationService
      .getCoLocation(this.coLocationId)
      .subscribe((coLocation) => {
        this.coLocation = coLocation;
      });
  }

  loadStLocations() {
    this.ciLocationService
      .getStLocationsByCoLocationId(this.coLocationId)
      .subscribe((stLocations) => {
        this.stLocations = stLocations;
      });
  }

  addStLocation() {
    this.ciLocationService
      .addStLocation(this.stLocationForm.value, this.coLocationId)
      .subscribe((stLocation) => {
        this.stLocations.push(stLocation);
        if (this.coLocation.coLocationName === 'USA') {
          this.toastr.success('State Added');
        }
        if (this.coLocation.coLocationName === 'Other') {
          this.toastr.success('Country Added');
        }
        this.stLocationForm.reset();
        this.loadStLocations();
      });
  }
}
