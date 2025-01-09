import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

/**
 * Component for displaying and editing the user's profile.
 * Includes functionality to view and update user information, manage favorite movies, and navigate to other parts of the app.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
  providers: [DatePipe] // Provide DatePipe in this component
})
export class UserProfileComponent implements OnInit {
  /** Stores the user's profile data. */
  userData: any = {};

  /** Array to hold the user's favorite movies. */
  favoriteMovies: any[] = [];

  /** Flag to toggle the edit mode for user profile updates. */
  isEditing: boolean = false;

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData - Service for making API calls related to user data.
   * @param router - Router service for navigation.
   * @param snackBar - Service for displaying snack bar notifications.
   * @param datePipe - Service for formatting dates.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    // Initialize user data from localStorage
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  /**
   * Lifecycle hook that initializes the component.
   * If user data is available, fetches the latest user information from the backend.
   */
  ngOnInit(): void {
    if (this.userData?.Name) {
      this.getUser();
    } else {
      console.error('User data is missing');
    }
  }

  /**
   * Fetches the user's profile data from the backend API.
   * Updates localStorage with the latest user data.
   */
  getUser(): void {
    this.fetchApiData.getUserByName(this.userData.Name).subscribe(
      (res: any) => {
        this.userData = res;
        localStorage.setItem('currentUser', JSON.stringify(this.userData));
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  /**
   * Formats the user's birthday for display.
   * @returns A formatted date string (e.g., "April 1, 1996") or null if no birthday is available.
   */
  getFormattedBirthday(): string | null {
    if (this.userData.Birthday) {
      return this.datePipe.transform(this.userData.Birthday, 'longDate');
    }
    return null;
  }

  /**
   * Updates the user's profile data by sending the changes to the backend API.
   * On success, updates localStorage and displays a success message.
   * On failure, displays an error message.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (res: any) => {
        this.userData = res;
        localStorage.setItem('currentUser', JSON.stringify(this.userData));
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        this.isEditing = false;
      },
      (err: any) => {
        console.error(err);
        this.snackBar.open('Failed to update profile.', 'OK', { duration: 3000 });
      }
    );
  }

  /**
   * Toggles the edit mode for updating the user's profile.
   */
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  /**
   * Resets the user's profile data to its original state from localStorage.
   */
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  /**
   * Navigates the user back to the movie list.
   */
  backToMovie(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs the user out by clearing their data from localStorage and navigating to the welcome page.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('currentUser');
  }
}
