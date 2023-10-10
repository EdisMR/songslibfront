import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { songInterface } from '../interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  private song: songInterface = {
    public_id: "5f6a5d1d-0a8a-4e2b-9d1d-6f9e0b2c0c1b",
    date_created: new Date(),
    date_updated: new Date(),
    title: "A Song for Testing",
    artist: "Test Artist",
    tempo: 120,
    linkstring: "test",
    lyric: "Dm%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250A%25C3%2593diame%2520por%2520piedad%252C%2520yo%2520te%2520lo%2520pido%250AD7%2Cquerido%250AF%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250AQue%2520tan%2520solo%2520se%2520odia%252C%2520lo%2520querido",
    files: ["randomfile1.pdf", "randomfile2.mp3", "randomfile3.aac"],
    categories: ["categoria1", "categoria2", "categoria3"],
    active: true
  }
  private songSubject: BehaviorSubject<songInterface> = new BehaviorSubject<songInterface>(this.song)
  public song$ = this.songSubject.asObservable()

  private allSongs: songInterface[] = [{
    public_id: "5f6a5d1d-0a8a-4e2b-9d1d-6f9e0b2c0c1b",
    date_created: new Date(),
    date_updated: new Date(),
    title: "Alegre la mañana",
    artist: "Test Artist",
    tempo: 120,
    linkstring: "test",
    lyric: "Dm%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250A%25C3%2593diame%2520por%2520piedad%252C%2520yo%2520te%2520lo%2520pido%250AD7%2Cquerido%250AF%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250AQue%2520tan%2520solo%2520se%2520odia%252C%2520lo%2520querido",
    files: ["randomfile1.pdf", "randomfile2.mp3", "randomfile3.aac"],
    categories: ["categoria1", "categoria2", "categoria3"],
    active: true
  },{
    public_id: "5f6a5d1d-0a8a-4e2b-9d1d-6f9e0b2c0c1b",
    date_created: new Date(),
    date_updated: new Date(),
    title: "Cantemos al amor de los amores",
    artist: "Test Artist",
    tempo: 120,
    linkstring: "test",
    lyric: "Dm%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250A%25C3%2593diame%2520por%2520piedad%252C%2520yo%2520te%2520lo%2520pido%250AD7%2Cquerido%250AF%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250AQue%2520tan%2520solo%2520se%2520odia%252C%2520lo%2520querido",
    files: ["randomfile1.pdf", "randomfile2.mp3", "randomfile3.aac"],
    categories: ["categoria1", "categoria2", "categoria3"],
    active: true
  },{
    public_id: "5f6a5d1d-0a8a-4e2b-9d1d-6f9e0b2c0c1b",
    date_created: new Date(),
    date_updated: new Date(),
    title: "Juntos cantando la alegría",
    artist: "Test Artist",
    tempo: 120,
    linkstring: "test",
    lyric: "Dm%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250A%25C3%2593diame%2520por%2520piedad%252C%2520yo%2520te%2520lo%2520pido%250AD7%2Cquerido%250AF%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520A7%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520Dm%250AQue%2520tan%2520solo%2520se%2520odia%252C%2520lo%2520querido",
    files: ["randomfile1.pdf", "randomfile2.mp3", "randomfile3.aac"],
    categories: ["categoria1", "categoria2", "categoria3"],
    active: true
  }]
  private songsList: BehaviorSubject<songInterface[]> = new BehaviorSubject<songInterface[]>(this.allSongs)
  public songsList$ = this.songsList.asObservable()

  public updateSong(song: songInterface) {
    this.song = song
    this.songSubject.next(song)
  }
}
