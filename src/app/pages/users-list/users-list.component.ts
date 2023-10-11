import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersInterface } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private usersService: UsersService
    ) {
      this.idFormBuilder()
      this.nameChangeFormBuilder()
      this.emailChangeFormBuilder()
      this.passChangeFormBuilder()
  }

  public usersInfo: UsersInterface[] = []
  public userEditing: UsersInterface = {} as UsersInterface
  public get isItMe(): boolean {
    return false
  }

  private userSubscription: Subscription = this.usersService.usersList$
  .subscribe((usersList) => {
    this.usersInfo = usersList
    this.userEditing = usersList[0] //! Implementar. Obtener el usuario desde url
  })

  public idForm!: FormGroup
  public idFormSubscription!: Subscription
  private idFormBuilder() {
    this.idForm = this._fb.group({
      //! Implementar. Obtener el id desde la url
      idControl: [this.userEditing.public_id]
    })
    this.idFormSubscription = this.idForm.valueChanges
      .subscribe((value) => {
        //! Implementar. redireccion a la ruta /users/:id
        console.log(value)
      })
  }

  public nameChangeForm!:FormGroup
  private nameChangeFormBuilder() {
    this.nameChangeForm = this._fb.group({
      newName: ['']
    })
  }
  changeName(){}


  public emailChangeForm!:FormGroup
  private emailChangeFormBuilder() {
    this.emailChangeForm = this._fb.group({
      newEmail: ['']
    })
  }
  changeEmail(){}



  public passChangeForm!:FormGroup
  private passChangeFormBuilder() {
    this.passChangeForm = this._fb.group({
      oldPass: [''],
      newPass: [''],
      newPassConfirm: ['',[Validators.required]]
    })
  }
  changePass(){}


  deleteUser(){}

  public get userActive(): boolean {
    return true
  }
  switchActiveUser(){}


  logout(){}
  

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.idFormSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

}
