// src/app/app.component.ts
import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Ang';
}
