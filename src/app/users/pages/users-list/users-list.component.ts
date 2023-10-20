import { Component, OnDestroy, OnInit } from '@angular/core';
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


  selectUser(userIdSelected: string) {
    console.log({'User selected':userIdSelected})
  }

  createUser() {
    console.log('Create user request')
  }


  changeUsername(newName:string){
    console.log({'new name':newName})
  }

  changeEmail(newEmail:string){
    console.log({'new email':newEmail})
  }


  deleteUser() { }

  public get userActive(): boolean {
    return true
  }
  switchActiveUser() { }


  logout() { }




  createSong() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}
