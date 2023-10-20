import { Injectable } from '@angular/core';
import { RespCreateUserInterface, RespGetAllUsers, RespNoDataInterface, UsersInterface } from '../interfaces/users.interface';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/app/environment/environment';
import { SnackbarService } from 'src/app/services/snackbar-svc.service';

@Injectable()
export class UsersService {

  constructor(
    private _http: HttpClient,
    private _loader: LoaderService,
    private _snackBar: SnackbarService,
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
          this._snackBar.error('Error al solicitar USUARIOS')
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
          this._snackBar.success('USUARIO creado')
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al crear USUARIO')
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
          this._snackBar.success('USUARIO modificado')
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al modificar USUARIO')
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
          this._snackBar.success('Email de USUARIO modificado')
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al modificar email')
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
          this._snackBar.success('Contraseña modificada')
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al modificar contraseña de USUARIO')
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
          this._snackBar.success('USUARIO eliminado')
          return
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al eliminar USUARIO')
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
          this._snackBar.success('Usuario modificado')
          return resp.data
        }),
        catchError((err) => {
          this._loader.hide()
          this._snackBar.error('Error al modificar USUARIO')
          return EMPTY
        }),
        tap(() => {
          this._loader.hide()
        })
      )
  }
}
