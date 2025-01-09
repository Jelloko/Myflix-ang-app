// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to close the dialog on success
import { UserRegistrationService } from '../fetch-api-data.service'; // API service for user registration
import { MatSnackBar } from '@angular/material/snack-bar'; // Notification display

/**
 * Component for the user registration form.
 * Allows users to register by entering their name, password, email, and birthday.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  standalone: false,
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User data object to store form input values.
   * @property {string} Name - The name of the user.
   * @property {string} Password - The password chosen by the user.
   * @property {string} Email - The email address of the user.
   * @property {string} Birthday - The birthday of the user.
   */
  @Input() userData = { Name: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - Service for making API calls related to user registration.
   * @param dialogRef - Reference to the dialog containing this component.
   * @param snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {}

  /**
   * Sends the user data to the backend for registration.
   * On success, closes the dialog and shows a success notification.
   * On failure, shows an error notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for successful user registration
        this.dialogRef.close(); // Closes the modal on success
        this.snackBar.open('Signup Successful!', 'OK', {
          duration: 2000
        });
      },
      (result) => {
        // Handles registration error
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    );
  }
}

