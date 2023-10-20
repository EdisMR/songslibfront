import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersInterface } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users.service';


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






  



  


  deleteUser() { }

  public get userActive(): boolean {
    return true
  }
  switchActiveUser() { }


  logout() { }

  createSong() { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}
