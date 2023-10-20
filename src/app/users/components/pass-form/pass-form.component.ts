import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pass-form',
  templateUrl: './pass-form.component.html',
  styleUrls: ['./pass-form.component.scss']
})
export class PassFormComponent {
  constructor(
    private _fb: FormBuilder,
  ) {
    this.passChangeFormBuilder();
  }

  @Output() newPassRequest = new EventEmitter<{
    oldPass: string,
    newPass: string,
    newPassConfirm: string
  }>
  @Input('changes') set changes(changes:string){
    this.passChangeForm.reset()
  }

  public passChangeForm!: FormGroup
  private passChangeFormBuilder() {
    this.passChangeForm = this._fb.group({
      oldPass: ['', []],
      newPass: ['', [Validators.required]],
      newPassConfirm: ['', [Validators.required]]
    })
  }

  changePass() {
    this.newPassRequest.emit({
      newPass: this.passChangeForm.value.newPass||'',
      newPassConfirm: this.passChangeForm.value.newPassConfirm||'',
      oldPass: this.passChangeForm.value.oldPass||'',
    })
  }
}
