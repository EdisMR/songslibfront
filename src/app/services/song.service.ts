import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { RespGetAllSongs, songInterface } from '../interfaces/song.interface';
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

  public allSongs$(): Observable<songInterface[]> {
    this._loader.display()
    return this._http.get<RespGetAllSongs>(this.variables.api_songs)
      .pipe(
        map((resp) => {
          this.allSongsSource = resp.data
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

  public updateSong(song: songInterface) {
  }


  public getCategories() { }
}
