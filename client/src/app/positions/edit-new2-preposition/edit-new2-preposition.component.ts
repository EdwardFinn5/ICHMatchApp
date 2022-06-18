import { Component, OnInit } from '@angular/core';
import { CiempLocation } from 'src/app/_models/ciempLocation';
import { PosCategory } from 'src/app/_models/posCategory';
import { PositName } from 'src/app/_models/positName';
import { StempLocation } from 'src/app/_models/stempLocation';
import { CiemplocationService } from 'src/app/_services/ciemplocation.service';
import { PositNameService } from 'src/app/_services/positname.service';

@Component({
  selector: 'app-edit-new2-preposition',
  templateUrl: './edit-new2-preposition.component.html',
  styleUrls: ['./edit-new2-preposition.component.css'],
})
export class EditNew2PrepositionComponent implements OnInit {
  stempLocations: StempLocation[];
  ciempLocations: CiempLocation[];
  posCategories: PosCategory[];
  positNames: PositName[];

  constructor(
    private ciempLocationService: CiemplocationService,
    private positNameService: PositNameService
  ) {}

  ngOnInit(): void {
    this.loadPosCategories();
    this.loadStempLocations();
  }

  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  onSelect(stempLocations) {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
        this.ciempLocations = ciempLocations.filter(
          (s) => s.stempLocationId == stempLocations.target.value
        );
      });
  }

  loadPosCategories() {
    this.positNameService.getPosCategories().subscribe((posCategories) => {
      this.posCategories = posCategories;
    });
  }

  onPosSelect(posCategories) {
    this.positNameService.getPositNames().subscribe((positNames) => {
      this.positNames = positNames;
      this.positNames = positNames.filter(
        (s) => s.posCategoryId == posCategories.target.value
      );
    });
  }
}
