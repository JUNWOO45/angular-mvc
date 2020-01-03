import { Injectable } from '@angular/core';
import { UserDto, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[];

  constructor() { 
    const users: UserDto[] = JSON.parse(localStorage.getItem('users')) || [];
    this.users = users.map(user => new User(user));
  }

  _commit(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  add(user: User) {
    console.log('user : ', user);
    console.log(new User(user))
    this.users.push(new User(user));
    this._commit(this.users);
  }

  edit(userId: string, userToEdit: User) {
    this.users = this.users.map(user => user.id === userId ? new User({ ...user, ...userToEdit }) : user);
    this._commit(this.users);
  }

  delete(userId: string) {
    this.users = this.users.filter(({ id }) => id !== userId);
    this._commit(this.users);
  }

  toggle(userId: string) {
    this.users = this.users.map(user => user.id === userId ? new User({ ...user, complete: !user.complete }) : user);
    this._commit(this.users);
  }
}
