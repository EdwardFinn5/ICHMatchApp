import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-list-news-titles',
  templateUrl: './list-news-titles.component.html',
  styleUrls: ['./list-news-titles.component.css'],
})
export class ListNewsTitlesComponent implements OnInit {
  @Input() newes: News[];
  newsId: Number;

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadNewes();
  }

  loadNewes() {
    this.newsService.getNewes().subscribe((newes) => {
      this.newes = newes;
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
