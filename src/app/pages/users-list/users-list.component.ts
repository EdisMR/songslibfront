import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersInterface } from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(private _fb: FormBuilder) {
  }

  usersInfo: UsersInterface[] = [{
    public_id: '000',
    name: 'Juan',
    email: 'email@email.com'
  }]
  userEditing: UsersInterface = {
    public_id: '000',
    name: 'Fabio',
    email: 'fabio@email.com'
  }
  isItMe: boolean = false

  public idForm!: FormGroup
  public idFormSubscription!: Subscription
  private idFormBuilder() {
    this.idForm = this._fb.group({
      //! Implementar. Obtener el id del usuario logueado
      idControl: [this.userEditing.public_id || '']
    })
    this.idFormSubscription = this.idForm.valueChanges
      .subscribe((value) => {
        //! Implementar. redireccion a la ruta /users/:id
        console.log(value)
      })
  }





  private getInfoFromApi() {
    this.idFormBuilder()
  }

  ngOnInit(): void {
    this.getInfoFromApi()
  }

  ngOnDestroy(): void {
    this.idFormSubscription.unsubscribe()
  }

}
