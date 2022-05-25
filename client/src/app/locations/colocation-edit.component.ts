import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoLocation } from '../_models/coLocation';
import { CilocationService } from '../_services/cilocation.service';

@Component({
  selector: 'app-colocation-edit',
  templateUrl: './colocation-edit.component.html',
  styleUrls: ['./colocation-edit.component.css'],
})
export class ColocationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  coLocation: CoLocation;
  coLocationId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ciLocationService: CilocationService
  ) {}

  ngOnInit(): void {
    this.loadCoLocation();
  }

  loadCoLocation() {
    this.coLocationId = +this.route.snapshot.paramMap.get('coLocationId');
    this.ciLocationService
      .getCoLocation(this.coLocationId)
      .subscribe((coLocation) => {
        this.coLocation = coLocation;
      });
  }

  updateCoLocation() {
    this.coLocationId = +this.route.snapshot.paramMap.get('coLocationId');
    this.ciLocationService
      .updateCoLocation(this.coLocation, this.coLocationId)
      .subscribe(() => {
        this.toastr.success('CoLocation Updated');
        this.editForm.reset(this.coLocation);
        this.router.navigateByUrl('/locationlist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/locationlist');
  }
}
