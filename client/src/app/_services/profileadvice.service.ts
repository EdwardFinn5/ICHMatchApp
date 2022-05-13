import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfileAdvice } from '../_models/profileAdvice';

@Injectable({
  providedIn: 'root',
})
export class ProfileadviceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfileAdvices() {
    return this.http.get<ProfileAdvice[]>(this.baseUrl + 'profileadvice');
  }

  getProfileAdvice(profileAdviceId: number) {
    console.log(
      'profile advice id inside service get profil eadvice: ',
      profileAdviceId
    );
    return this.http.get<ProfileAdvice>(
      this.baseUrl + 'profileadvice/getprofileadvicebyid/' + profileAdviceId
    );
  }

  addProfileAdvice(model: any) {
    return this.http.post<ProfileAdvice>(
      this.baseUrl + 'profileadvice/',
      model
    );
  }

  deleteProfileAdvice(id: number) {
    return this.http.delete(this.baseUrl + 'profileadvice/' + id);
  }

  updateProfileAdvice(profileAdvice: ProfileAdvice, profileAdviceId: number) {
    console.log('getting profile advice info');
    console.log(profileAdviceId);
    console.log('updating profile advice');
    return this.http.put(
      this.baseUrl + 'profileadvice/' + profileAdviceId,
      profileAdvice
    );
  }
}
