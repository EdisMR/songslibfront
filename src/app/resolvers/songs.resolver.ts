import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { songInterface } from '../interfaces/song.interface';
import { SongService } from '../services/song.service';

@Injectable({
  providedIn: 'root'
})
export class SongsResolver {
  constructor(
    private _song: SongService,
    private _router: Router

    //!LOGIN SERVICE para filtrar los cantos inactivos en modo CLIENT
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<songInterface[]> | Observable<songInterface> {
    let songId:string = '';
    songId = route.paramMap.get('id') || ''
    if (songId.length > 1) {
      return this._song.allSongs$()
        .pipe(
          map((songsList: songInterface[]) => {
            let result = {} as songInterface
            result = songsList.filter((song) => {
              return song.public_id == songId || song.url == songId
            })[0]
            if(result === undefined) {
              this._router.navigate(['/not-found'])
            }
            return result
          })
        )
    }
    return this._song.allSongs$()
  }
}
