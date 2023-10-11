import { Injectable } from '@angular/core';
import { UsersInterface } from '../interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private usersList: UsersInterface[] = [{
    public_id: '1',
    date_created: new Date(),
    date_updated: new Date(),
    username: 'user1',
    email: 'email11111@meila.com',
    active: true
  }, {
    public_id: '2',
    date_created: new Date(),
    date_updated: new Date(),
    username: 'user2',
    email: 'email22222@meila.com',
    active: true
  }]
  private usersListSource: BehaviorSubject<UsersInterface[]> = new BehaviorSubject<UsersInterface[]>(this.usersList)
  public usersList$ = this.usersListSource.asObservable()


  public changeEmail(params: {
    id: string,
    newEmail: string
  }): void {
  }

  public changeUsername(params: {
    id: string,
    newUsername: string
  }): void {
  }

  public changePassword(params: {
    id: string,
    oldPassword: string,
    newPassword: string
  }): void {
  }

  public changeActive(params: {
    id: string,
    newActive: boolean
  }): void { }

  public deleteUser(id: string): void {
  }
}
