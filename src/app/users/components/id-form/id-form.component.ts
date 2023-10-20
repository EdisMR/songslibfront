import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersInterface } from '../../interfaces/users.interface';

@Component({
  selector: 'app-id-form',
  templateUrl: './id-form.component.html',
  styleUrls: ['./id-form.component.scss']
})
export class IdFormComponent implements OnDestroy {

  constructor(
    private _fb: FormBuilder,
  ) {
    this.idFormBuilder();
  }

  
  @Input('users') set users(users:UsersInterface[]){
    this.usersInfo=users;
    this.idFormBuilder();
  }
  @Output() userIdSelected = new EventEmitter<string>();
  @Output() createNewUser = new EventEmitter<void>();

  public usersInfo: UsersInterface[] = []

  public idForm!: FormGroup
  public idFormSubscription!: Subscription
  private idFormBuilder() {
    this.idForm = this._fb.group({
      idControl: []
    })
    this.idFormSubscription = this.idForm.valueChanges
      .subscribe((value) => {
        this.selectUser()
      })
  }
  private get idControl(){
    return this.idForm.value.idControl
  }

  createUser(){
    this.createNewUser.emit()
  }

  selectUser(){
    if(this.idControl){
      this.userIdSelected.emit(this.idForm.value.idControl)
    }
  }

  ngOnDestroy(): void {
    this.idFormSubscription?.unsubscribe()
  }
}
