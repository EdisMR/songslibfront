import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.scss']
})
export class UsernameFormComponent {
  constructor(
    private _fb:FormBuilder
  ){
    this.nameChangeFormBuilder()
  }

  @Input('username') set username(username:string){
    this.usernameSource=username
    this.nameChangeFormBuilder()
  }
  @Output() changeUsername=new EventEmitter<string>

  public usernameSource:string=''
  public nameChangeForm!: FormGroup
  private nameChangeFormBuilder() {
    this.nameChangeForm = this._fb.group({
      newName: [this.usernameSource]
    })
  }
  changeName() {
    this.changeUsername.emit(this.nameChangeForm.value.newName)
  }
}
