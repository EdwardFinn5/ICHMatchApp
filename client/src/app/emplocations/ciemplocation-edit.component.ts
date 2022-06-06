import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiempLocation } from '../_models/ciempLocation';
import { CiemplocationService } from '../_services/ciemplocation.service';

@Component({
  selector: 'app-ciemplocation-edit',
  templateUrl: './ciemplocation-edit.component.html',
  styleUrls: ['./ciemplocation-edit.component.css'],
})
export class CiemplocationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ciempLocation: CiempLocation;
  ciempLocationId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ciempLocationService: CiemplocationService
  ) {}

  ngOnInit(): void {
    this.loadCiempLocation();
  }

  loadCiempLocation() {
    this.ciempLocationId = +this.route.snapshot.paramMap.get('ciempLocationId');
    this.ciempLocationService
      .getCiempLocation(this.ciempLocationId)
      .subscribe((ciempLocation) => {
        this.ciempLocation = ciempLocation;
      });
  }

  updateCiempLocation() {
    this.ciempLocationId = +this.route.snapshot.paramMap.get('ciempLocationId');
    this.ciempLocationService
      .updateCiempLocation(this.ciempLocation, this.ciempLocationId)
      .subscribe(() => {
        this.toastr.success('Emp City Updated');
        this.editForm.reset(this.ciempLocation);
        this.router.navigateByUrl('/emplocationlist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/emplocationlist');
  }
}
