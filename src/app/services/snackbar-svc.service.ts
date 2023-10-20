import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) {
  }


    success(message:string){
      this._snackBar.open(message, '', {
        duration: 2000,
        panelClass:['msg-success']
      })
    }



    error(message:string){
      this._snackBar.open(message, 'Ok',{
        panelClass:['msg-error']
      })
    }



    warn(message:string){
      this._snackBar.open(message, 'Ok',{
        panelClass:['msg-warn']
      })
    }

}
