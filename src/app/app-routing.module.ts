import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SongComponent } from './pages/song/song.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { SongsResolver } from './resolvers/songs.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve:{songs:SongsResolver} },
  { path: 'song/:id', component: SongComponent, resolve:{songs:SongsResolver} },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
