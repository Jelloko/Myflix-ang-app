import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this for ngModel support
import { MatDialogModule } from '@angular/material/dialog'; // Angular Material dialog
import { MatCardModule } from '@angular/material/card'; // Material card
import { MatInputModule } from '@angular/material/input'; // Material input
import { MatButtonModule } from '@angular/material/button'; // Material buttons
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatIconModule } from '@angular/material/icon';
import { GenreDialogComponent } from './genre-info/genre-info.component';
import { DirectorDialogComponent } from './director-info/director-info.component';
import { SynopsisDialogComponent } from './synopsis-info/synopsis-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    MovieCardComponent,
    UserLoginFormComponent,
    WelcomePageComponent,
    DirectorDialogComponent,
    GenreDialogComponent,
    SynopsisDialogComponent,
    UserProfileComponent // Declare the UserRegistrationFormComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Necessary for form controls
    MatDialogModule, 
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


