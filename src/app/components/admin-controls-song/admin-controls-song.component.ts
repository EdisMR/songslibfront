import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { songInterface } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-admin-controls-song',
  templateUrl: './admin-controls-song.component.html',
  styleUrls: ['./admin-controls-song.component.scss']
})
export class AdminControlsSongComponent {
  constructor() { }

  private song: songInterface = {} as songInterface
  @Input() set songInput(song: songInterface) {
    this.song = song
  }
  @Output() songAdminUpdatesEmmiter = new EventEmitter<songInterface>();
  @Output() songRequestDeletion = new EventEmitter<{}>();


  public get activeSong() {
    return this.song.active
  }

  public updateActive(activeData: MatSlideToggleChange) {
    this.song.active = activeData.checked
    this.songAdminUpdatesEmmiter.emit(this.song)
  }

  requestDeletion() {
    if (window.confirm(`¿Desea eliminar esta canción?\n${this.song.title}`))
    this.songRequestDeletion.emit()
  }
}
