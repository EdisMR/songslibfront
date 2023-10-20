import { Component } from '@angular/core';
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
  public passChangeForm!: FormGroup
  private passChangeFormBuilder() {
    this.passChangeForm = this._fb.group({
      oldPass: [''],
      newPass: [''],
      newPassConfirm: ['', [Validators.required]]
    })
  }
  changePass() { }
}
