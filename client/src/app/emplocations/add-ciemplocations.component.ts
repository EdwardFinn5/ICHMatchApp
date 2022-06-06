import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiempLocation } from '../_models/ciempLocation';
import { StempLocation } from '../_models/stempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-add-ciemplocations',
  templateUrl: './add-ciemplocations.component.html',
  styleUrls: ['./add-ciemplocations.component.css'],
})
export class AddCiemplocationsComponent implements OnInit {
  @Input() ciempLocations: CiempLocation[];
  stempLocationId: number;
  ciempLocationId: number;
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
        this.toastr.success('Emp City Added');
        this.ciempLocationForm.reset();
        this.loadCiempLocations();
      });
  }

  deleteCiempLocation(id: number) {
    this.ciempLocationId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.ciempLocationService.deleteCiempLocation(id).subscribe(() => {
      this.ciempLocations.splice(
        this.ciempLocations.findIndex((m) => m.ciempLocationId === id),
        1
      );
      this.toastr.success('Emp City Deleted');
    });
  }
}
