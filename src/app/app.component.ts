import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _loaderSvc: LoaderService) { }

  public isLoading: boolean = false
  private loadingSubscription: Subscription = this._loaderSvc.loading$
    .subscribe((loading: boolean) => {
      this.isLoading = loading
    })
}
