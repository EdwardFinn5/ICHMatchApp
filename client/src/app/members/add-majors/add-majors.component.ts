import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { Major } from 'src/app/_models/major';

@Component({
  selector: 'app-add-majors',
  templateUrl: './add-majors.component.html',
  styleUrls: ['./add-majors.component.css'],
})
export class AddMajorsComponent implements OnInit {
  categories: Category[];
  majors: Major[];

  constructor() {}

  ngOnInit(): void {}
}
