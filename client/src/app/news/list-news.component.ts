import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css'],
})
export class ListNewsComponent implements OnInit {
  newes: News[];
  newsId: number;

  constructor(
    private newsService: NewsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNewes();
  }

  loadNewes() {
    this.newsService.getNewes().subscribe((newes) => {
      this.newes = newes;
    });
  }

  deleteNews(id: number) {
    this.newsId = id;
    console.log('The next item is newsId', this.newsId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.newes.splice(
        this.newes.findIndex((m) => m.newsId === id),
        1
      );
    });
  }

  // editNews(id: number) {
  //   console.log('the next number is id');
  //   console.log(id);
  //   this.router.navigate(['/positions/GetPositionById/', id]);
  // }
}
