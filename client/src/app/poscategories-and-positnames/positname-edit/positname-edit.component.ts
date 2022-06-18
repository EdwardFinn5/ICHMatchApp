import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PositName } from 'src/app/_models/positName';
import { PositNameService } from 'src/app/_services/positname.service';

@Component({
  selector: 'app-positname-edit',
  templateUrl: './positname-edit.component.html',
  styleUrls: ['./positname-edit.component.css'],
})
export class PositnameEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  positName: PositName;
  positNameId: number;
  posName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private positNameService: PositNameService
  ) {}

  ngOnInit(): void {
    this.loadPositName();
  }

  loadPositName() {
    this.positNameId = +this.route.snapshot.paramMap.get('positNameId');
    console.log('1st positNameId: ', this.positNameId);
    this.positNameService
      .getPositName(this.positNameId)
      .subscribe((positName) => {
        this.positName = positName;
        this.posName = positName.posName;
        console.log('postion name: ', this.posName);
      });
  }

  updatePositName() {
    this.positNameId = +this.route.snapshot.paramMap.get('positNameId');
    this.positNameService
      .updatePositName(this.positName, this.positNameId)
      .subscribe(() => {
        this.toastr.success('Position Updated');
        this.editForm.reset(this.positName);
        this.router.navigateByUrl(
          '/addpositnames/' + this.positName.posCategoryId
        );
      });
  }

  cancel() {
    this.router.navigateByUrl('/addpositnames/' + this.positName.posCategoryId);
  }
}
