import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SongComponent } from './pages/song/song.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'song/:id', component: SongComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
