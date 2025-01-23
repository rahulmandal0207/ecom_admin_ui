import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, User } from '../models/data-models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly appUrl: string = 'https://localhost:44333/api/';

  constructor() {}

  http = inject(HttpClient);

  // Enums start

  loadUserRoles() {
    return this.http.get(this.appUrl + 'Enum/userroles/');
  }

  // Enums end

  // user start

  onLogin(login: LoginRequest) {
    return this.http.post(this.appUrl + 'User/login/', login, {
      observe: 'response',
    });
  }

  getUsers() {
    return this.http.get(this.appUrl + 'User/', { observe: 'response' });
  }

  getUserById(id: number) {
    return this.http.get(this.appUrl + `User/${id}`, { observe: 'response' });
  }

  createUser(user: User) {
    return this.http.post(this.appUrl + 'User/', user, { observe: 'response' });
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.appUrl + `User/${id}`, user, {
      observe: 'response',
    });
  }

  deleteUser(id: number) {
    return this.http.delete(this.appUrl + `User/${id}`, {
      observe: 'response',
    });
  }

  // user end
}
