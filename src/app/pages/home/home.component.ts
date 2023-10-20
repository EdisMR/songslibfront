import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { categoriesListEnv } from 'src/app/environment/environment';
import { categoriesInterface } from 'src/app/interfaces/categories.interface';
import { songInterface } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._activatedRoute.data.subscribe(data => {
      this.songsListSource = data['songs']
      this.songsListFiltered = data['songs']
      this.buildFormSearch();
      this.formFilterDataBuilder()
    })
  }

  public songsListSource: songInterface[] = []
  public songsListFiltered: songInterface[] = []
  public categories: categoriesInterface[] = categoriesListEnv
  public searchTerm: string = ''


  public formFilterData!: FormGroup
  private formFilterDataSubscription!: Subscription
  private formFilterDataBuilder(): void {
    this.formFilterData = this._fb.group({
      tag: ['']
    })
    this.formFilterDataSubscription = this.formFilterData.valueChanges.subscribe(data => {
      this.formSearchDeactivator()
      this.searchTerm = data.tag
      this.filterData()
    })
  }
  private formFilterDeactivator() {
    this.formFilterDataSubscription?.unsubscribe();
    this.formFilterData.reset()
    this.formFilterDataBuilder()
  }


  public formSearch!: FormGroup
  private formSearchSubscription!: Subscription
  private buildFormSearch() {
    this.formSearch = this._fb.group({
      searchterm: ['']
    })
    this.formSearchSubscription = this.formSearch.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.formFilterDeactivator()
        this.searchTerm = data.searchterm
        this.filterData()
      })
  }
  private formSearchDeactivator() {
    this.formSearchSubscription?.unsubscribe()
    this.formSearch.reset()
    this.buildFormSearch()
  }


  private filterData() {
    this.songsListFiltered = this.songsListSource.filter(song => {
      const titleMatch = song.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const tagsMatch = song.categories.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return titleMatch || tagsMatch;
    });
  }


  ngOnDestroy(): void {
    this.formSearchSubscription?.unsubscribe()
    this.formFilterDataSubscription?.unsubscribe()
  }
}
