import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StempLocation } from '../_models/stempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-stemplocation-edit',
  templateUrl: './stemplocation-edit.component.html',
  styleUrls: ['./stemplocation-edit.component.css'],
})
export class StemplocationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  stempLocation: StempLocation;
  stempLocationId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ciempLocationService: CiemplocationService
  ) {}

  ngOnInit(): void {
    this.loadStempLocation();
  }

  loadStempLocation() {
    this.stempLocationId = +this.route.snapshot.paramMap.get('stempLocationId');
    this.ciempLocationService
      .getStempLocation(this.stempLocationId)
      .subscribe((stempLocation) => {
        this.stempLocation = stempLocation;
      });
  }

  updateStempLocation() {
    this.stempLocationId = +this.route.snapshot.paramMap.get('stempLocationId');
    this.ciempLocationService
      .updateStempLocation(this.stempLocation, this.stempLocationId)
      .subscribe(() => {
        this.toastr.success('State Updated');
        this.editForm.reset(this.stempLocation);
        this.router.navigateByUrl('/emplocationlist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/emplocationlist');
  }
}
