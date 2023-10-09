import { Component, OnDestroy } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';
import { environment } from 'src/app/environment/environment';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnDestroy {
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

    public get audiosList() {
      let filetypesAllowed:string[]= environment.fileTypeAllowed
      return this.song.files.filter((file) => {
        /* extract file extension */
        let fileExt = file.split('.').pop()
        return filetypesAllowed.includes('.' + fileExt)
      })
    }

    public get otherFilesList() {
      let filetypesAllowed:string[]= environment.fileTypeAllowed
      return this.song.files.filter((file) => {
        /* extract file extension */
        let fileExt = file.split('.').pop()
        return !filetypesAllowed.includes('.' + fileExt)
      })
    }

    public get staticFilesDir() {
      return environment.static_files_dir
    }

  updatedSongInfo(songInfo: songInterface) {
    this.song = songInfo
    this.updateNowSongInfo()
  }

  updatedTags(tags: string[]) {
    this.song.categories = tags
    this.updateNowSongInfo()
  }

  ngOnDestroy() {
    this.songInfo.unsubscribe()
  }
}
