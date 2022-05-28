import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoLocation } from '../_models/coLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-location-list-students',
  templateUrl: './location-list-students.component.html',
  styleUrls: ['./location-list-students.component.css'],
})
export class LocationListStudentsComponent implements OnInit {
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
}
