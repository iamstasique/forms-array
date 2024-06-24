import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from '../services/api.service';
import { FormCard } from '../shared/types/form-card.type';

@Injectable({
  providedIn: 'root'
})
export class FormsRepository {
  private url = environment.url;
  private apiService: ApiService = inject(ApiService);

  submitAllForms(forms: FormCard[]): Observable<boolean> {
    return this.apiService.post<{ result: string }>(`${this.url}/submitForm`, { forms }).pipe(
      map(response => response.result === 'nice job' ? true : false),
      catchError(_ => of(false))
    );
  }
}
