import { Component, OnDestroy } from '@angular/core';
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

  public usersInfo: UsersInterface[] = []

  public idForm!: FormGroup
  public idFormSubscription!: Subscription
  private idFormBuilder() {
    this.idForm = this._fb.group({
      //! Implementar. Obtener el id desde la url
      idControl: []
    })
    this.idFormSubscription = this.idForm.valueChanges
      .subscribe((value) => {
        //! Implementar. redireccion a la ruta /users/:id
        console.log(value)
      })
  }

  ngOnDestroy(): void {
    this.idFormSubscription?.unsubscribe()
  }
}
