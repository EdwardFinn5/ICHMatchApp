import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-stlocation-edit',
  templateUrl: './stlocation-edit.component.html',
  styleUrls: ['./stlocation-edit.component.css'],
})
export class StlocationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  stLocation: StLocation;
  stLocationId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ciLocationService: CilocationService
  ) {}

  ngOnInit(): void {
    this.loadStLocation();
  }

  loadStLocation() {
    this.stLocationId = +this.route.snapshot.paramMap.get('stLocationId');
    this.ciLocationService
      .getStLocation(this.stLocationId)
      .subscribe((stLocation) => {
        this.stLocation = stLocation;
      });
  }

  updateStLocation() {
    this.stLocationId = +this.route.snapshot.paramMap.get('stLocationId');
    this.ciLocationService
      .updateStLocation(this.stLocation, this.stLocationId)
      .subscribe(() => {
        this.toastr.success('StLocation Updated');
        this.editForm.reset(this.stLocation);
        this.router.navigateByUrl('/locationlist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/locationlist');
  }
}
