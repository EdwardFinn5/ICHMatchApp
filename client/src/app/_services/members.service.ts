import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CardMember } from '../_models/cardMember';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  cardMembers: CardMember[] = [];
  paginatedResult: PaginatedResult<CardMember[]> = new PaginatedResult<
    CardMember[]
  >();

  constructor(private http: HttpClient) {}

  // getMembers(page?: number, itemsPerPage?: number, appUserType?: string) {
  //   let params = new HttpParams();

  //   if (page !== null && itemsPerPage !== null) {
  //     params = params.append('pageNumber', page.toString());
  //     params = params.append('pageSize', itemsPerPage.toString());
  //     params = params.append('appUserType', appUserType.toString());
  //   }
  //   // if (this.cardMembers.length > 0) {
  //   //   return of(this.cardMembers);
  //   // }
  //   return this.http
  //     .get<CardMember[]>(this.baseUrl + 'cardusers', {
  //       observe: 'response',
  //       params,
  //     })
  //     .pipe(
  //       // map((cardMembers) => {
  //       //   this.cardMembers = cardMembers;
  //       //   return cardMembers; //map returns members back as observable
  //       // })
  //       map((response) => {
  //         this.paginatedResult.result = response.body;
  //         if (response.headers.get('Pagination') !== null) {
  //           this.paginatedResult.pagination = JSON.parse(
  //             response.headers.get('Pagination')
  //           );
  //         }
  //         return this.paginatedResult;
  //       })
  //     );
  //}

  getMembers(appUserType: string) {
    return this.http.get<CardMember[]>(
      this.baseUrl + 'cardusers/GetByAppUserType/' + appUserType
    );
  }

  getMember(username: string) {
    const cardMember = this.cardMembers.find((x) => x.username === username);
    if (cardMember !== undefined) return of(cardMember);
    return this.http.get<CardMember>(this.baseUrl + 'cardusers/' + username);
  }

  getCardMemberById(appUserId: number) {
    console.log('hello');
    return this.http.get<CardMember>(
      this.baseUrl + 'cardusers/GetById/' + appUserId
    );
  }
}
