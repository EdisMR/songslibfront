import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { categoriesListEnv } from 'src/app/environment/environment';
import { categoriesInterface } from 'src/app/interfaces/categories.interface';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  constructor() {}

  categories: categoriesInterface[] = categoriesListEnv

  tagsList: string[] = []
  @Input() set tags(data:string[]){
    this.tagsList = data
  }
  
  @Output() tagsUpdated = new EventEmitter<string[]>();
  emitUpdates() {
    this.tagsUpdated.emit(this.tagsList);
  }

  fruitCtrl = new FormControl(); // the user's input

  @ViewChild('fruitInput', { read: ElementRef }) fruitInput: ElementRef<HTMLInputElement> = inject(ElementRef);

  selected(event: MatAutocompleteSelectedEvent): void {
    // prevent the user from adding the same fruit twice
    if (this.tagsList.includes(event.option.viewValue)) {
      return;
    }

    // add the selected fruit to the user's list of fruits
    this.tagsList.push(event.option.viewValue);

    // clear the user's input
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    // emit an event to notify the parent component that the list of fruits has changed
    this.emitUpdates();
  }

  remove(fruit: string): void {
    // find the index of the fruit in the user's list of fruits
    const index = this.tagsList.indexOf(fruit);

    // if the fruit is in the list, remove it
    if (index >= 0) {
      this.tagsList.splice(index, 1);

    }

    // emit an event to notify the parent component that the list of fruits has changed
    this.emitUpdates();
  }

  ngOnInit(): void {
  }
}
