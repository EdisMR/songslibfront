import { Component, OnDestroy } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';
import { environment } from 'src/app/environment/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

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
    this.getSongId()
  }

  song: songInterface = {} as songInterface

  getSongId() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.getSongInfo(params['id'])
    })
  }

  updateNowSongInfo() {
    this._songSvc.updateSong(this.song)
  }

  private allSongsSubscription!: Subscription
  private getSongInfo(idParam:string) {
    this.allSongsSubscription = this._songSvc.allSongs$()
      .subscribe((songsList) => {
        this.song = songsList.filter((song) => {
          return song.public_id == idParam
        })[0]
      })
  }

  public get audiosList() {
    let filetypesAllowed: string[] = environment.fileTypeAllowed
    return this.song.files.filter((file) => {
      /* extract file extension */
      let fileExt = file.split('.').pop()
      return filetypesAllowed.includes('.' + fileExt)
    })
  }

  public get otherFilesList() {
    let filetypesAllowed: string[] = environment.fileTypeAllowed
    return this.song.files.filter((file) => {
      /* extract file extension */
      let fileExt = file.split('.').pop()
      return !filetypesAllowed.includes('.' + fileExt)
    })
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
    this.allSongsSubscription.unsubscribe()
  }
}
