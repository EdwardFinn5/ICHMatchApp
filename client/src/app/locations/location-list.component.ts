import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoLocation } from '../_models/coLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  @Input() coLocations: CoLocation[];
  coLocationId: number;
  @ViewChild('coLocationForm') coLocationForm: NgForm;

  constructor(
    private ciLocationService: CilocationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCoLocations();
  }

  loadCoLocations() {
    this.ciLocationService.getCoLocations().subscribe((coLocations) => {
      this.coLocations = coLocations;
    });
  }

  addCoLocation() {
    this.ciLocationService
      .addCoLocation(this.coLocationForm.value)
      .subscribe((coLocation) => {
        this.coLocations.push(coLocation);
        this.toastr.success('CoLocation Added');
        this.coLocationForm.reset();
        this.loadCoLocations();
      });
  }

  deleteCoLocation(id: number) {
    this.coLocationId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.ciLocationService.deleteCoLocation(id).subscribe(() => {
      this.coLocations.splice(
        this.coLocations.findIndex((m) => m.coLocationId === id),
        1
      );
      this.toastr.success('CoLocation Deleted');
    });
  }
}
