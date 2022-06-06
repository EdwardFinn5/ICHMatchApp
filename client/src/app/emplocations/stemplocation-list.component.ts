import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StempLocation } from '../_models/stempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-stemplocation-list',
  templateUrl: './stemplocation-list.component.html',
  styleUrls: ['./stemplocation-list.component.css'],
})
export class StemplocationListComponent implements OnInit {
  @Input() stempLocations: StempLocation[];
  stempLocationId: number;
  @ViewChild('stempLocationForm') stempLocationForm: NgForm;

  constructor(
    private ciempLocationService: CiemplocationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStempLocations();
  }

  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  addStempLocation() {
    this.ciempLocationService
      .addStempLocation(this.stempLocationForm.value)
      .subscribe((stempLocation) => {
        this.stempLocations.push(stempLocation);
        this.toastr.success('State Added');
        this.stempLocationForm.reset();
        this.loadStempLocations();
      });
  }

  deleteStempLocation(id: number) {
    this.stempLocationId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.ciempLocationService.deleteStempLocation(id).subscribe(() => {
      this.stempLocations.splice(
        this.stempLocations.findIndex((m) => m.stempLocationId === id),
        1
      );
      this.toastr.success('State Deleted');
    });
  }
}
