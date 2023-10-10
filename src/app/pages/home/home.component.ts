import { Component } from '@angular/core';
import { categoriesListEnv } from 'src/app/environment/environment';
import { categoriesInterface } from 'src/app/interfaces/categories.interface';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private songSvc:SongService){
    this.songSvc.songsList$.subscribe(data=>{
      this.songsList=data
    })
  }

  public categories:categoriesInterface=categoriesListEnv
  songsList:songInterface[]=[]
}
