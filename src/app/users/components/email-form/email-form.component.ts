import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent {
  constructor(
    private _fb: FormBuilder,
  ) {
    this.emailChangeFormBuilder();
  }
  public emailChangeForm!: FormGroup
  private emailChangeFormBuilder() {
    this.emailChangeForm = this._fb.group({
      newEmail: ['']
    })
  }
  changeEmail() { }
}
