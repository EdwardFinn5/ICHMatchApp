import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preregister-stud',
  templateUrl: './preregister-stud.component.html',
  styleUrls: ['./preregister-stud.component.css'],
})
export class PreregisterStudComponent implements OnInit {
  @Output() value: string = '';
  preregisterStudForm: FormGroup;
  validationErrors: string[] = [];
  registerCode8: string = 'studentconnect';

  constructor() {}

  ngOnInit(): void {}
}
