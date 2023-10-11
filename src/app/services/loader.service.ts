import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loading: boolean = false
  private loadingSource: BehaviorSubject<boolean> = new BehaviorSubject(this.loading)
  public loading$ = this.loadingSource.asObservable()
  
  
  private counterForLoads: number = 0
  public display() {
    this.counterForLoads++
    if (this.counterForLoads>0) {
      this.loading = true
      this.loadingSource.next(this.loading)
    }
  }
  public hide() {
    this.counterForLoads--
    if (this.counterForLoads==0) {
      this.loading = false
      this.loadingSource.next(this.loading)
    }
  }
}
