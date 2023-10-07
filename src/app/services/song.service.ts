import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { songInterface } from '../interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  private songDev: songInterface = {
    public_id: "5f6a5d1d-0a8a-4e2b-9d1d-6f9e0b2c0c1b",
    date_created: new Date(),
    date_updated: new Date(),
    title: "A Song for Testing",
    artist: "Test Artist",
    tempo: 120,
    linkstring: "test",
    lyric: "test",
    files: ["randomfile1.pdf", "randomfile2.mp3", "randomfile3.aac"],
    categories: ["categoria1", "categoria2", "categoria3"],
    active: true
  }

  private songSubject: BehaviorSubject<songInterface> = new BehaviorSubject<songInterface>(this.songDev)
  song$ = this.songSubject.asObservable()

  public updateSong(song: songInterface) {
    this.songDev = song
    this.songSubject.next(song)
  }
}
