import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from '../_models/news';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  model: any = {};
  @ViewChild('addNewsForm') addNewsForm: NgForm;
  news: News;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.addNewsForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private newsService: NewsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addNews() {
    this.newsService.addNews(this.model).subscribe(() => {
      this.toastr.success('News item added');
      this.addNewsForm.reset(this.model);
      this.router.navigateByUrl('/listnews');
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/listnews');
  }
}
