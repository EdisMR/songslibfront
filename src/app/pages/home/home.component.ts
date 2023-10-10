import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categoriesListEnv } from 'src/app/environment/environment';
import { categoriesInterface } from 'src/app/interfaces/categories.interface';
import { songInterface } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private songSvc: SongService
  ) {
    this.buildForm()
    this.filterData()
  }

  public songsListSource: songInterface[] = []
  public songsListFiltered: songInterface[] = []
  private songsSubscription: Subscription = this.songSvc.songsList$
    .subscribe(songs => {
      this.songsListSource = songs
    })
  public categories: categoriesInterface = categoriesListEnv

  public get resultsFrom(): string {
    let resultsFrom = ''
    if (this.searchterm.length >= 4) {
      resultsFrom = this.searchterm
    }
    if (this.choosenCategory.length > 0) {
      resultsFrom = this.choosenCategory
    }
    return resultsFrom
  }

  chooseOneCategory(categorySelected: string, preventSearchProblem?: boolean) {
    if (!preventSearchProblem) {
      this.formSearch.reset()
    }
    this.choosenCategory = categorySelected
    this.songsListFiltered = []
    this.filterData()
  }
  choosenCategory = ''


  filterData() {
    let songsLength: number = this.songsListSource.length
    this.songsListFiltered = []
    for (let i = 0; i < songsLength; i++) {
      if (this.choosenCategory.length > 0) {
        if (this.songsListSource[i].categories.includes(this.choosenCategory)) {
          this.songsListFiltered.push(this.songsListSource[i])
        }
      }
      if (this.searchterm.length >= 4) {
        if (((this.songsListSource[i].title).toLocaleLowerCase()).includes((this.searchterm).toLocaleLowerCase())) {
          this.songsListFiltered.push(this.songsListSource[i])
        }
      }
    }
    if (this.searchterm.length < 4 && this.choosenCategory.length == 0) {
      this.songsListFiltered = this.songsListSource
    }
  }

  /* form */
  public formSearch!: FormGroup
  private formSearchSubscription!: Subscription
  private buildForm() {
    this.formSearch = this._fb.group({
      searchterm: ['']
    })
    this.formSearchSubscription = this.formSearch.valueChanges
      .subscribe(data => {
        this.chooseOneCategory('', true)
        this.filterData()
      })
  }
  public get searchterm() {
    return this.formSearch.get('searchterm')?.value || ''
  }

  ngOnDestroy(): void {
    this.songsSubscription.unsubscribe()
    this.formSearchSubscription.unsubscribe()
  }
}
