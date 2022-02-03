import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CardMember } from '../_models/cardMember';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  cardMembers: CardMember[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    if (this.cardMembers.length > 0) {
      return of(this.cardMembers);
    }
    return this.http.get<CardMember[]>(this.baseUrl + 'cardusers').pipe(
      map((cardMembers) => {
        this.cardMembers = cardMembers;
        return cardMembers; //map returns members back as observable
      })
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
