/**
 * The WelcomePageComponent provides the main entry point for the application,
 * featuring dialogs for user registration, login, and displaying movie cards.
 */
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  standalone: false,
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Injects the MatDialog service to handle opening dialogs.
   * @param dialog - The Angular Material dialog service.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void { }

  /**
   * Opens a dialog for user registration.
   * The dialog displays the `UserRegistrationFormComponent`.
   * @returns void
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens a dialog for user login.
   * The dialog displays the `UserLoginFormComponent`.
   * @returns void
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens a dialog to display the movie cards.
   * The dialog displays the `MovieCardComponent`.
   * @returns void
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}

