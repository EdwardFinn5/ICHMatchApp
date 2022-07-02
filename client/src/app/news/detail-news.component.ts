import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css'],
})
export class DetailNewsComponent implements OnInit {
  news: News;
  newsId: number;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.newsId = +this.route.snapshot.paramMap.get('newsId');
    this.newsService.getNews(this.newsId).subscribe((news) => {
      this.news = news;
    });
  }
}
