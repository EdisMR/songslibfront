import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  @Input('email') set email(email:string){
    this.emailSource=email
    this.emailChangeFormBuilder()
  }
  @Output() emailChanged=new EventEmitter<string>

  public emailSource:string=''
  public emailChangeForm!: FormGroup
  private emailChangeFormBuilder() {
    this.emailChangeForm = this._fb.group({
      newEmail: [this.emailSource,Validators.email]
    })
  }
  private get newEmailValue(){
    return this.emailChangeForm.value.newEmail
  }

  changeEmail() {
    this.emailChanged.emit(this.newEmailValue)
  }
}
