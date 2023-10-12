import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { RespGetAllSongs, RespPatchSong, songInterface } from '../interfaces/song.interface';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _loader: LoaderService
  ) { }
  variables = {
    api_url: environment.api_url,
    api_categories: environment.api_url + "/categories",
    api_songs: environment.api_url + "/song",
  }


  private allSongsSource: songInterface[] = []
  private allSongsExposer: BehaviorSubject<songInterface[]> = new BehaviorSubject(this.allSongsSource)
  private allSongs: Observable<songInterface[]> = this.allSongsExposer.asObservable()

  public allSongs$(): Observable<songInterface[]> {
    if(this.allSongsSource.length === 0) {
      this._loader.display()
      return this._http.get<RespGetAllSongs>(this.variables.api_songs)
      .pipe(
        map((resp) => {
          this.allSongsSource = resp.data
          this.allSongsExposer.next(this.allSongsSource)
          return this.allSongsSource
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
    return this.allSongs
  }

  public updateSong(song: songInterface):Observable<songInterface> {
    this._loader.display()
    return this._http.patch<RespPatchSong>(this.variables.api_songs+'/'+song.public_id, song)
    .pipe(
      map((resp) => {
        return resp.data
      }),
      catchError((err) => {
        this._snackBar.open('Error al consultar la base de datos')
        return EMPTY
      }),
      tap(() => {
        this._loader.hide()
        let itemToUpdate= this.allSongsSource.findIndex((item) => item.public_id === song.public_id)
        this.allSongsSource[itemToUpdate] = song
      })
    )
  }


  public getCategories() { }
}
