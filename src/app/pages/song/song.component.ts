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

  updateNowSongInfo(){
    this._songSvc.updateSong(this.song)
  }

  private songInfo = this._songSvc.song$
    .subscribe((song) => {
      this.song = song
      console.clear()
      console.table(this.song)
    })

  updatedSongInfo(songInfo: songInterface) {
    this.song = songInfo
    this.updateNowSongInfo()
  }

  updatedTags(tags: string[]) {
    this.song.categories = tags
    this.updateNowSongInfo()
  }
}
