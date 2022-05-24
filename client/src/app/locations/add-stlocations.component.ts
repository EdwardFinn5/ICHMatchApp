import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoLocation } from '../_models/coLocation';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-add-stlocations',
  templateUrl: './add-stlocations.component.html',
  styleUrls: ['./add-stlocations.component.css'],
})
export class AddStlocationsComponent implements OnInit {
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
        this.toastr.success('StLocation Added');
        this.stLocationForm.reset();
        this.loadStLocations();
      });
  }

  deleteStLocation(id: number) {
    this.stLocationId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.ciLocationService.deleteStLocation(id).subscribe(() => {
      this.stLocations.splice(
        this.stLocations.findIndex((m) => m.stLocationId === id),
        1
      );
      this.toastr.success('StLocation Deleted');
    });
  }
}
