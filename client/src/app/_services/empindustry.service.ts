import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpIndustry } from '../_models/empIndustry';

@Injectable({
  providedIn: 'root',
})
export class EmpindustryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmpIndustries() {
    return this.http.get<EmpIndustry[]>(this.baseUrl + 'empindustry');
  }

  getEmpIndustry(empIndustryId: number) {
    return this.http.get<EmpIndustry>(
      this.baseUrl + 'empindustry/getempindustrybyid/' + empIndustryId
    );
  }

  addEmpIndustry(model: any) {
    return this.http.post<EmpIndustry>(this.baseUrl + 'empindustry/', model);
  }

  deleteEmpIndustry(id: number) {
    return this.http.delete(this.baseUrl + 'empIndustry/' + id);
  }

  updateEmpIndustry(empIndustry: EmpIndustry, empIndustryId: number) {
    return this.http.put(
      this.baseUrl + 'empindustry/' + empIndustryId,
      empIndustry
    );
  }
}
