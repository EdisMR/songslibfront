import { Component } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  constructor(
    private _songSvc: SongService
  ) { }

  song: songInterface = {} as songInterface

  private songInfo = this._songSvc.song$
    .subscribe((song) => {
      this.song = song
    })

}
