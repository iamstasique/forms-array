import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private repository: UserRepository = inject(UserRepository);

  checkUserName(userName: string): Observable<boolean> {
    return this.repository.checkUserName(userName);
  }
}
