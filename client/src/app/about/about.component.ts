import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  staff = [
    {
      id: 3,
      name: 'Ed Finn',
      position: 'President',
      image: '../../assets/images/ed.jpg',
    },

    {
      id: 1,
      name: 'Sandi Smith',
      position: 'VP of Scholarships & Administration',
      image: '../../assets/images/sandi.jpg',
    },
    {
      id: 2,
      name: 'Brian Estrem',
      position: 'Development Officer',
      image: '../../assets/images/Brian.png',
    },
  ];
}
