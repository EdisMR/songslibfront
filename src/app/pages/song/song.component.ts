import { Component, OnDestroy } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnDestroy {
  constructor(
    private _songSvc: SongService,
    private _activatedRoute: ActivatedRoute,
    private _router:Router
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

  copyLinkstring(){
    window.navigator.share({
      text: `${this.song.url} - ${this.song.title}`,
      url:window.location.href
    })
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
    this._songSvc.deleteSong(this.song.public_id).subscribe(e=>{
      this._router.navigate([''])
    })
  }

  ngOnDestroy() {
  }
}
