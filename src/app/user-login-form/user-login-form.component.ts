import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Represents a component for the user login form.
 * Allows users to log in by providing their credentials.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  standalone: false,
  styleUrls: ['./user-login-form.component.scss'], // Corrected property name
})
export class UserLoginFormComponent implements OnInit {
  /**
   * The user's login data, including their username and password.
   */
  @Input() userData = {
    Name: '',
    Password: '',
  };

  /**
   * Initializes the UserLoginFormComponent with required services.
   * 
   * @param fetchApiData - Service for handling user login-related API calls.
   * @param dialogRef - Reference to the dialog instance, allowing it to be closed programmatically.
   * @param snackBar - Service for displaying snack bar notifications.
   * @param router - Router service for navigating to different views.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook that is called after component initialization.
   * Currently, no additional logic is performed here.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by sending their credentials to the backend.
   * 
   * On successful login:
   * - Closes the dialog window.
   * - Displays a success message in a snack bar.
   * - Stores the user data and token in `localStorage`.
   * - Navigates to the "movies" view.
   * 
   * On failed login:
   * - Displays an error message in a snack bar.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result); // Log the result for debugging purposes
        this.dialogRef.close(); // Close the login dialog
        this.snackBar.open('User Login successful', 'OK', {
          duration: 2000,
        }); // Display success message
        localStorage.setItem('currentUser', JSON.stringify(result.user)); // Store user data
        localStorage.setItem('token', result.token); // Store authentication token
        this.router.navigate(['movies']); // Navigate to the movies page
      },
      (result) => {
        this.snackBar.open(result, 'NOT OK', {
          duration: 2000,
        }); // Display error message
      }
    );
  }
}
