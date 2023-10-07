import { Component, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { songInterface } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-song-info-form',
  templateUrl: './song-info-form.component.html',
  styleUrls: ['./song-info-form.component.scss']
})
export class SongInfoFormComponent implements OnDestroy {
  constructor(
    private _fb: FormBuilder,
  ) {
    this.buildSongInfoForm()
  }

  @Input() songInfo: songInterface = {} as songInterface

  songInfoForm!: FormGroup
  songInfoFormSubscription!: Subscription
  buildSongInfoForm() {
    this.songInfoForm = this._fb.group({
      title: [''],
      artist: [''],
      tempo: [0]
    })
    this.songInfoFormSubscription = this.songInfoForm.valueChanges.
      pipe(debounceTime(1000)).
      subscribe((songInfo) => {
        if(!songInfo.tempo){
          songInfo.tempo = 0
        }
      })
  }

  ngOnDestroy() {
    this.songInfoFormSubscription.unsubscribe()
  }
}
