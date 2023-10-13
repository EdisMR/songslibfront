import { Injectable } from '@angular/core';
import { RespGetAllUsers, UsersInterface } from '../interfaces/users.interface';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { songInterface, RespGetAllSongs } from 'src/app/interfaces/song.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UsersService {

  constructor(
    private _http: HttpClient,
    private _loader:LoaderService,
    private _snackBar: MatSnackBar,
    private _router:Router
  ) { }

  private url: string = environment.api_url + '/users/'

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


  public allUsers$(): Observable<UsersInterface[]> {
    if(this.usersList.length === 0) {
      this._loader.display()
      return this._http.get<RespGetAllUsers>(this.url)
      .pipe(
        map((resp) => {
          this.usersList = resp.data
          this.usersListSource.next(this.usersList)
          return this.usersList
        }),
        catchError((err) => {
          this._snackBar.open('Error al consultar la base de datos')
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
    }
    return this.usersList$
  }


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
