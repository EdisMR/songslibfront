import { Component, OnDestroy } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';
import { environment } from 'src/app/environment/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnDestroy {
  constructor(
    private _songSvc: SongService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._activatedRoute.data.subscribe((data: Params) => {
      this.song=data['songs']
    })
  }

  song: songInterface = {} as songInterface
  isAdmin: boolean = true;

  updateNowSongInfo() {
    this._songSvc.updateSong(this.song)
    .subscribe((resp) => {
      this.song = resp
    })
  }

  public get audiosList() {
    let filetypesAllowed: string[] = environment.fileTypeAllowed
    try {
      return this.song.files.filter((file) => {
        /* extract file extension */
        let fileExt = file.split('.').pop()
        return filetypesAllowed.includes('.' + fileExt)
      })
    } catch (error) { return [] }
  }

  public get otherFilesList() {
    let filetypesAllowed: string[] = environment.fileTypeAllowed
    try {
      return this.song.files.filter((file) => {
        /* extract file extension */
        let fileExt = file.split('.').pop()
        return !filetypesAllowed.includes('.' + fileExt)
      })
    } catch (error) { return [] }
  }

  public get staticFilesDir() {
    return environment.static_files_dir
  }

  updatedSong(songInfo: songInterface) {
    this.song = songInfo
    this.updateNowSongInfo()
  }

  updatedTags(tags: string[]) {
    this.song.categories = tags
    this.updateNowSongInfo()
  }

  updatedLyrics(lyrics: string) {
    this.song.lyric = lyrics
    this.updateNowSongInfo()
  }

  adminRequireDeletion() {
    console.log('Song deletion required')
  }

  ngOnDestroy() {
  }
}
