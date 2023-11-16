import { Component, EventEmitter, Input, Output } from '@angular/core';
import { songInterface } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-sources-form',
  templateUrl: './sources-form.component.html',
  styleUrls: ['./sources-form.component.scss']
})
export class SourcesFormComponent {

  @Input() set songInput(data: songInterface) {
    this.song = data
  }
  @Input() set editing(data: boolean) {
    this.editingNow = data
  }

  @Output() sourcesUpdated = new EventEmitter<songInterface>();
  emitUpdates() {
    this.sourcesUpdated.emit(this.song);
  }

  editingNow=false
  song: songInterface = {} as songInterface

  removeSource(index:number){
    let result=window.confirm(`¿Eliminar este elemento?
    ${this.song.sources[index]}`)
    if(result){
      this.song.sources.splice(index,1)
      this.emitUpdates()
    }
    return false
  }

  addLink(){
    let link=window.prompt('Ingresar URL de recurso')
    if(link){
      this.song.sources.push(link)
      this.emitUpdates()
    }
  }
}
