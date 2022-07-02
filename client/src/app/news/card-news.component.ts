import { Component, Input, OnInit } from '@angular/core';
import { News } from '../_models/news';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.css'],
})
export class CardNewsComponent implements OnInit {
  @Input() news: News;

  constructor() {}

  ngOnInit(): void {}
}
