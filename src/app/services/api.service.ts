import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);

  post<T>(path: string, body?: any): Observable<T> {
    return this.httpClient
      .post(path, body)
      .pipe(map((data) => data as T));
  }
}
