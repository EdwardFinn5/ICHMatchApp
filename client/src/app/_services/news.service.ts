import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../_models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  baseUrl = environment.apiUrl;
  newes: News[] = [];
  newsId: number;
  news: News;
  private currentNewsSource = new ReplaySubject<News>(1);
  currentNews$ = this.currentNewsSource.asObservable();

  constructor(private http: HttpClient) {}

  getNewes() {
    return this.http.get<News[]>(this.baseUrl + 'news');
  }

  getNews(newsId: number) {
    console.log('news id inside service get news: ', newsId);
    return this.http.get<News>(this.baseUrl + 'news/getnewsbyid/' + newsId);
  }

  addNews(model: any) {
    return this.http.post(this.baseUrl + 'news/', model);
  }

  updateNews(news: News, newsId: number) {
    console.log('2nd newsid: ', newsId);
    return this.http.put(this.baseUrl + 'news/' + newsId, news);
  }

  deleteNews(id: number) {
    return this.http.delete(this.baseUrl + 'news/' + id);
  }

  setMainNewsPhoto(photoId: number) {
    return this.http.put(
      this.baseUrl + 'searchusers/set-main-hr-photo/' + photoId,
      {}
    );
  }

  deleteNewsPhoto(photoId: number) {
    return this.http.delete(
      this.baseUrl + 'searchusers/delete-photo-hr/' + photoId
    );
  }
}
