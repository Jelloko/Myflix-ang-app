import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
  providers: [DatePipe] // Provide DatePipe in this component
})
export class UserProfileComponent implements OnInit {
  userData: any = {}; // User data
  favoriteMovies: any[] = []; // Array to hold favorite movies
  isEditing: boolean = false; // Flag to toggle edit mode

  constructor(
    public fetchApiData: UserRegistrationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    // Initialize user data from localStorage
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    if (this.userData?.Name) {
      this.getUser();
    } else {
      console.error('User data is missing');
    }
  }

  // Get user data from API
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

  // Format birthday for display
  getFormattedBirthday(): string | null {
    if (this.userData.Birthday) {
      return this.datePipe.transform(this.userData.Birthday, 'longDate'); // e.g., "April 1, 1996"
    }
    return null;
  }

  // Update user profile
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (res: any) => {
        this.userData = res; // Update user data from the response
        localStorage.setItem('currentUser', JSON.stringify(this.userData)); // Update localStorage
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        this.isEditing = false; // Exit editing mode
      },
      (err: any) => {
        console.error(err);
        this.snackBar.open('Failed to update profile.', 'OK', { duration: 3000 });
      }
    );
  }

  // Enable edit mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Reset user data to original state
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Navigate back to movie list
  backToMovie(): void {
    this.router.navigate(['movies']);
  }

  // Logout and navigate to welcome page
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('currentUser');
  }
}




