import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from '../services/api.service';
import { IsAvailable } from '../types/is-available.type';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  private url = environment.url;

  private apiService: ApiService = inject(ApiService);

  checkUserName(username: string): Observable<boolean> {
    return this.apiService.post<IsAvailable>(`${this.url}/checkUsername`, { username }).pipe(
      map(result => result.isAvailable)
    );
  }
}
