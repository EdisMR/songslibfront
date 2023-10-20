import { Injectable } from '@angular/core';
import { RespCreateUserInterface, RespGetAllUsers, RespNoDataInterface, UsersInterface } from '../interfaces/users.interface';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/app/environment/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UsersService {

  constructor(
    private _http: HttpClient,
    private _loader: LoaderService,
    private _snackBar: MatSnackBar,
  ) { }

  private url: string = environment.api_url + '/users/'

  private usersList: UsersInterface[] = []
  private usersListSource: BehaviorSubject<UsersInterface[]> = new BehaviorSubject<UsersInterface[]>(this.usersList)
  public usersList$ = this.usersListSource.asObservable()


  public allUsers$(): Observable<UsersInterface[]> {
    this._loader.display()
    return this._http.get<RespGetAllUsers>(this.url)
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this.usersList = resp.data
          this.usersListSource.next(this.usersList)
          return this.usersList
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al solicitar USUARIOS', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }

  public createUser(): Observable<UsersInterface> {
    this._loader.display()
    return this._http.post<RespCreateUserInterface>(this.url, {})
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('USUARIO creado', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al crear USUARIO', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }



  public changeUsername(params: {
    id: string,
    newUsername: string
  }): Observable<UsersInterface> {
    this._loader.display()
    return this._http.patch<RespCreateUserInterface>(this.url + params.id, {
      username: params.newUsername
    })
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('USUARIO modificado', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al modificar USUARIO', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }



  public changeEmail(params: {
    id: string,
    newEmail: string
  }): Observable<UsersInterface> {
    this._loader.display()
    return this._http.patch<RespCreateUserInterface>(this.url + params.id, {
      email: params.newEmail
    })
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('Email de USUARIO modificado', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al modificar email', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }



  public changePassword(params: {
    id: string,
    oldPassword: string,
    newPassword: string,
  }): Observable<UsersInterface> {
    this._loader.display()
    return this._http.patch<RespCreateUserInterface>(this.url + params.id, {
      new_password: params.newPassword,
      old_password: params.oldPassword,
    })
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('Contraseña modificada', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al modificar contraseña de USUARIO', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }



  public deleteUser(id: string): Observable<void> {
    this._loader.display()
    return this._http.delete<RespNoDataInterface>(this.url + id)
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('USUARIO eliminado', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al eliminar USUARIO', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }


  public changeActive(params: {
    id: string,
    newActive: boolean
  }):Observable<UsersInterface> {
    this._loader.display()
    return this._http.patch<RespCreateUserInterface>(this.url + params.id, {
      active: params.newActive,
    })
      .pipe(
        map((resp) => {
          if (resp.response_details.execution_result == false) {
            throw new Error(resp.response_details.message)
          }
          this._snackBar.open('Usuario modificado', '', {
            duration: 2000,
            panelClass:['msg-success']
          })
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.open('Error al modificar USUARIO', 'Ok',{
            panelClass:['msg-error']
          })
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }
}
