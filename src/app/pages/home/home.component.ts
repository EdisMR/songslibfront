import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    this._activatedRoute.data.subscribe(data=>{
      this.songsListSource=data['songs']
      this.buildForm()
      this.filterData()
    })
  }

  public songsListSource: songInterface[] = []
  public songsListFiltered: songInterface[] = []
  public categories: categoriesInterface[] = categoriesListEnv

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

  choosenCategory = ''
  chooseOneCategory(categorySelected: string, preventSearchProblem?: boolean) {
    if (!preventSearchProblem) {
      this.formSearch.reset()
    }
    this.choosenCategory = categorySelected
    this.songsListFiltered = []
    this.filterData()
  }


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
    this.formSearchSubscription.unsubscribe()
  }
}
