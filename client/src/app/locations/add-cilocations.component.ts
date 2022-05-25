import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiLocation } from '../_models/ciLocation';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-add-cilocations',
  templateUrl: './add-cilocations.component.html',
  styleUrls: ['./add-cilocations.component.css'],
})
export class AddCilocationsComponent implements OnInit {
  @Input() ciLocations: CiLocation[];
  stLocationId: number;
  ciLocationId: number;
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
        this.toastr.success('CiLocation Added');
        this.ciLocationForm.reset();
        this.loadCiLocations();
      });
  }

  deleteCiLocation(id: number) {
    this.ciLocationId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.ciLocationService.deleteCiLocation(id).subscribe(() => {
      this.ciLocations.splice(
        this.ciLocations.findIndex((m) => m.ciLocationId === id),
        1
      );
      this.toastr.success('CiLocation Deleted');
    });
  }
}
