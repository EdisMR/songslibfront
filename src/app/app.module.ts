import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminControlsSongComponent } from './components/admin-controls-song/admin-controls-song.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';
import { SongInfoFormComponent } from './components/song-info-form/song-info-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SongComponent } from './pages/song/song.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';



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
  MatTooltipModule
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    SongComponent,
    FooterComponent,
    SongInfoFormComponent,
    CategoriesFormComponent,
    LyricsComponent,
    AdminControlsSongComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImports,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
