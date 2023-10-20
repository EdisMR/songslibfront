import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersRoutingModule } from './users-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from './services/users.service';
import { IdFormComponent } from './components/id-form/id-form.component';
import { UsernameFormComponent } from './components/username-form/username-form.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { PassFormComponent } from './components/pass-form/pass-form.component';
import { SnackbarService } from '../services/snackbar-svc.service';

const MaterialImports = [
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
]

@NgModule({
  declarations: [
    UsersListComponent,
    IdFormComponent,
    UsernameFormComponent,
    EmailFormComponent,
    PassFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialImports
  ],
  providers:[
    UsersService,
    SnackbarService
  ]
})
export class UsersModule { }
