import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminControlsSongComponent } from './components/admin-controls-song/admin-controls-song.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';
import { SongInfoFormComponent } from './components/song-info-form/song-info-form.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SongComponent } from './pages/song/song.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DonationComponent } from './components/donation/donation.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SourcesFormComponent } from './components/sources-form/sources-form.component';


const MaterialImports = [
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatRippleModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatProgressBarModule,
  DragDropModule
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongComponent,
    FooterComponent,
    SongInfoFormComponent,
    CategoriesFormComponent,
    LyricsComponent,
    AdminControlsSongComponent,
    NotFoundComponent,
    AboutComponent,
    DonationComponent,
    SourcesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImports,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
