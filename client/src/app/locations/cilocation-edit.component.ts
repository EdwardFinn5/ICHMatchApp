import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiLocation } from '../_models/ciLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-cilocation-edit',
  templateUrl: './cilocation-edit.component.html',
  styleUrls: ['./cilocation-edit.component.css'],
})
export class CilocationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ciLocation: CiLocation;
  ciLocationId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ciLocationService: CilocationService
  ) {}

  ngOnInit(): void {
    this.loadCiLocation();
  }

  loadCiLocation() {
    this.ciLocationId = +this.route.snapshot.paramMap.get('ciLocationId');
    this.ciLocationService
      .getCiLocation(this.ciLocationId)
      .subscribe((ciLocation) => {
        this.ciLocation = ciLocation;
      });
  }

  updateCiLocation() {
    this.ciLocationId = +this.route.snapshot.paramMap.get('ciLocationId');
    this.ciLocationService
      .updateCiLocation(this.ciLocation, this.ciLocationId)
      .subscribe(() => {
        this.toastr.success('CiLocation Updated');
        this.editForm.reset(this.ciLocation);
        this.router.navigateByUrl('/locationlist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/locationlist');
    console.log('test');
  }
}
