import { Component, OnInit, Output } from '@angular/core';
import { Category } from '../_models/category';
import { CiLocation } from '../_models/ciLocation';
import { CoLocation } from '../_models/coLocation';
import { Major } from '../_models/major';
import { StLocation } from '../_models/stLocation';
import { CilocationService } from '../_services/cilocation.service';
import { MajorService } from '../_services/major.service';

@Component({
  selector: 'app-step1-register-stud',
  templateUrl: './step1-register-stud.component.html',
  styleUrls: ['./step1-register-stud.component.css'],
})
export class Step1RegisterStudComponent implements OnInit {
  @Output() value: string = '';
  categories: Category[];
  majors: Major[];
  coLocations: CoLocation[];
  stLocations: StLocation[];
  ciLocations: CiLocation[];

  constructor(
    private majorService: MajorService,
    private ciLocationService: CilocationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMajors();
    this.loadCoLocations();
    this.loadStLocations();
    // this.loadCiLocations();
  }

  loadCategories() {
    this.majorService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadMajors() {
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
    });
  }

  loadCoLocations() {
    this.ciLocationService.getCoLocations().subscribe((coLocations) => {
      this.coLocations = coLocations;
    });
  }

  loadStLocations() {
    this.ciLocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
    });
  }

  // loadCiLocations() {
  //   this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
  //     this.ciLocations = ciLocations;
  //   });
  // }

  onSelect(categories) {
    // console.log(categories.target.value);
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      // console.log('all majors', majors);
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
      console.log('category id: ', categories.target.value);
    });
  }

  onCoSelect(coLocations) {
    // console.log(categories.target.value);
    this.ciLocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
      // console.log('all majors', majors);
      this.stLocations = stLocations.filter(
        (s) => s.coLocationId == coLocations.target.value
      );
      console.log('coLocations id: ', coLocations.target.value);
    });
  }

  onStSelect(stLocations) {
    // console.log(categories.target.value);
    this.ciLocationService.getCiLocations().subscribe((ciLocations) => {
      this.ciLocations = ciLocations;
      // console.log('all majors', majors);
      this.ciLocations = ciLocations.filter(
        (c) => c.stLocationId == stLocations.target.value
      );
      console.log('stLocations id: ', stLocations.target.value);
    });
  }
}
