import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
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
    this.getAllUsers()
  }

  public usersInfo: UsersInterface[] = []
  public userEditing: UsersInterface = {} as UsersInterface
  public get isItMe(): boolean {
    return false
  }


  private getAllUsers(params?: {
    newUserRedirection: boolean,
    userIdRedirection: string
  }) {
    this.usersService.allUsers$().subscribe(users => {
      this.usersInfo = users
      if (params?.newUserRedirection) {
        this.selectUser(params.userIdRedirection)
      }
    })
  }



  private userSubscription: Subscription = this.usersService.usersList$
    .subscribe((usersList) => {
      this.usersInfo = usersList
    })


  selectUser(userIdSelected: string) {
    console.log({ 'User selected': userIdSelected })
    let index: number = this.usersInfo.findIndex((e: UsersInterface) => {
      return e.public_id == userIdSelected
    })
    this.userEditing = this.usersInfo[index]
  }

  createUser() {
    this.usersService.createUser().subscribe(user => {
      this.getAllUsers({
        newUserRedirection: true,
        userIdRedirection: user.public_id
      })
    })
  }



  changeUsername(newName: string) {
    this.usersService.changeUsername({
      id: this.userEditing.public_id,
      newUsername: newName
    }).subscribe(user => {
      this.getAllUsers({
        newUserRedirection: true,
        userIdRedirection: user.public_id
      })
    })
  }



  changeEmail(newEmailR: string) {
    this.usersService.changeEmail({
      id: this.userEditing.public_id,
      newEmail: newEmailR
    }).subscribe(user => {
      this.getAllUsers({
        newUserRedirection: true,
        userIdRedirection: user.public_id
      })
    })
  }


  modifyPass(data: {
    oldPass: string,
    newPass: string,
  }) {
    this.usersService.changePassword({
      id: this.userEditing.public_id,
      newPassword: data.newPass,
      oldPassword: data.oldPass
    }).subscribe(user => {
      this.getAllUsers({
        newUserRedirection: true,
        userIdRedirection: user.public_id
      })
    })
  }



  deleteUser() {
    let deleteQuestion = window.confirm('¿Desea eliminar este usuario?')
    if(deleteQuestion){
      this.usersService.deleteUser(this.userEditing.public_id).subscribe(e => {
        this.userEditing = {
          active:false,
          date_created:new Date(),
          date_updated:new Date(),
          email:'',
          public_id:'',
          username:''
        }
        this.getAllUsers()
      })
    }
  }

  public get userActive(): boolean {
    return this.userEditing.active
  }
  switchActiveUser() {
    this.usersService.changeActive({
      id: this.userEditing.public_id,
      newActive: !this.userActive
    }).subscribe(user => {
      this.getAllUsers({
        newUserRedirection: true,
        userIdRedirection: user.public_id
      })
    })
  }



  logout() { }



  createSong() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}
