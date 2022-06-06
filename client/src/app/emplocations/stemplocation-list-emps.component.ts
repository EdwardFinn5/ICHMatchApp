import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StempLocation } from '../_models/stempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-stemplocation-list-emps',
  templateUrl: './stemplocation-list-emps.component.html',
  styleUrls: ['./stemplocation-list-emps.component.css'],
})
export class StemplocationListEmpsComponent implements OnInit {
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
}
