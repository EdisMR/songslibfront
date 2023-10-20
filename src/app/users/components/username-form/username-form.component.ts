import { Component } from '@angular/core';
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
  public nameChangeForm!: FormGroup
  private nameChangeFormBuilder() {
    this.nameChangeForm = this._fb.group({
      newName: ['']
    })
  }
  changeName() { }
}
