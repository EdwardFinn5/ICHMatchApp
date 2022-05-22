import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterCode } from '../_models/registerCode';

@Injectable({
  providedIn: 'root',
})
export class RegisterCodeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRegisterCodes() {
    return this.http.get<RegisterCode[]>(this.baseUrl + 'registercode');
  }

  getRegisterCode(registerCodeId: number) {
    console.log(
      'register code id inside service get register code: ',
      registerCodeId
    );
    return this.http.get<RegisterCode>(
      this.baseUrl + 'registercode/getregistercodebyid/' + registerCodeId
    );
  }

  addRegisterCode(model: any) {
    return this.http.post<RegisterCode>(this.baseUrl + 'registercode/', model);
  }

  deleteRegisterCode(id: number) {
    return this.http.delete(this.baseUrl + 'registercode/' + id);
  }

  updateRegisterCode(registerCode: RegisterCode, registerCodeId: number) {
    console.log('getting register code info');
    console.log(registerCodeId);
    console.log('updating register code');
    return this.http.put(
      this.baseUrl + 'registercode/' + registerCodeId,
      registerCode
    );
  }
}
