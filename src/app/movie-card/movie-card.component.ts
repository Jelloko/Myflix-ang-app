// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-info/genre-info.component';
import { DirectorDialogComponent } from '../director-info/director-info.component';
import { SynopsisDialogComponent } from '../synopsis-info/synopsis-info.component';
import { Router } from '@angular/router';

/**
 * Component for displaying a list of movies as cards.
 * Allows users to view details about genres, directors, and synopses, add movies to their favorites, 
 * and navigate to their profile.
 */
@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to hold the list of movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * Initializes the MovieCardComponent with dependencies.
   * 
   * @param fetchApiData - Service to interact with the backend API for movie and user-related data.
   * @param dialog - Service to open Angular Material dialogs.
   * @param snackBar - Service to display notifications to the user.
   * @param router - Service for navigation between routes.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   * Fetches the list of movies from the API.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the API and stores them in the `movies` array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Opens a dialog to display genre information for the selected movie.
   * 
   * @param movie - The movie object containing genre information.
   */
  showGenre(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre: movie.Genre }
    });
  }

  /**
   * Opens a dialog to display director information for the selected movie.
   * 
   * @param movie - The movie object containing director information.
   */
  showDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director: movie.Director }
    });
  }

  /**
   * Opens a dialog to display the synopsis for the selected movie.
   * 
   * @param movie - The movie object containing the description (synopsis).
   */
  showSynopsis(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: movie.Description // Pass the description string directly
    });
  }

  /**
   * Navigates the user to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Adds a movie to the user's favorites.
   * 
   * @param movieId - The ID of the movie to add to the user's favorites.
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
}



