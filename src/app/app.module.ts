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

/**
 * The root module of the application.
 *
 * @remarks
 * This module declares all components used in the application and imports
 * essential Angular and Angular Material modules.
 */
@NgModule({
  declarations: [
    /** The root component of the application. */
    AppComponent,

    /** Component for user registration functionality. */
    UserRegistrationFormComponent,

    /** Component for displaying movie cards. */
    MovieCardComponent,

    /** Component for user login functionality. */
    UserLoginFormComponent,

    /** Component for the welcome page. */
    WelcomePageComponent,

    /** Dialog component for displaying director information. */
    DirectorDialogComponent,

    /** Dialog component for displaying genre information. */
    GenreDialogComponent,

    /** Dialog component for displaying movie synopsis. */
    SynopsisDialogComponent,

    /** Component for user profile management. */
    UserProfileComponent
  ],
  imports: [
    /** Module for running the application in a web browser. */
    BrowserModule,

    /** Module for routing within the application. */
    AppRoutingModule,

    /** Module for supporting template-driven forms. */
    FormsModule,

    /** Angular Material module for dialogs. */
    MatDialogModule,

    /** Angular Material module for cards. */
    MatCardModule,

    /** Angular Material module for input fields. */
    MatInputModule,

    /** Angular Material module for buttons. */
    MatButtonModule,

    /** Angular Material module for icons. */
    MatIconModule
  ],
  providers: [
    /** Provider for HTTP client services. */
    provideHttpClient(),

    /** Provider for asynchronous animations. */
    provideAnimationsAsync()
  ],
  /** The root component to bootstrap the application. */
  bootstrap: [AppComponent]
})
export class AppModule { }



