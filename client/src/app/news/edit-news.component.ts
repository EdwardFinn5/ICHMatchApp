import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  news: News;
  newsId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private newsService: NewsService
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

  updateNews() {
    this.newsId = +this.route.snapshot.paramMap.get('newsId');
    this.newsService.updateNews(this.news, this.newsId).subscribe(() => {
      this.toastr.success('News Updated');
      this.editForm.reset(this.news);
      this.router.navigateByUrl('/newslist');
    });
  }

  cancel() {
    this.router.navigateByUrl('/newslist');
  }
}
