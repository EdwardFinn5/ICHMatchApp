import { Component, OnInit, Output } from '@angular/core';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-list-news-card',
  templateUrl: './list-news-card.component.html',
  styleUrls: ['./list-news-card.component.css'],
})
export class ListNewsCardComponent implements OnInit {
  @Output() value: string = '';
  newes: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNewes();
  }

  loadNewes() {
    this.newsService.getNewes().subscribe((newes) => {
      this.newes = newes;
    });
  }
}
