import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { songInterface } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-song-info-form',
  templateUrl: './song-info-form.component.html',
  styleUrls: ['./song-info-form.component.scss']
})
export class SongInfoFormComponent implements OnInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
  ) {
  }

  @Input() songInfoInput: songInterface = {} as songInterface
  songInfo: songInterface = {} as songInterface

  /* emit event for updated form */
  @Output() songInfoUpdated = new EventEmitter<songInterface>()

  songInfoForm!: FormGroup
  songInfoFormSubscription!: Subscription
  buildSongInfoForm() {
    this.songInfoForm = this._fb.group({
      title: [this.songInfo.title],
      artist: [this.songInfo.artist],
      tempo: [this.songInfo.tempo || 0],
    })
    this.songInfoFormSubscription = this.songInfoForm.valueChanges.
      pipe(debounceTime(1000)).
      subscribe((songInfoData) => {
        if (!songInfoData.tempo) {
          songInfoData.tempo = 0
        }
        this.songInfo.title = songInfoData.title
        this.songInfo.artist = songInfoData.artist
        this.songInfo.tempo = songInfoData.tempo
        this.songInfoUpdated.emit(this.songInfo)
      })
  }

  ngOnInit(): void {
    this.songInfo = this.songInfoInput
    this.buildSongInfoForm()
  }

  ngOnDestroy() {
    this.songInfoFormSubscription.unsubscribe()
  }
}
