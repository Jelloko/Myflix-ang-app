// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-info/genre-info.component';
import { DirectorDialogComponent } from '../director-info/director-info.component';
import { SynopsisDialogComponent } from '../synopsis-info/synopsis-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  showGenre(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre: movie.Genre }
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director: movie.Director }
    });
  }

  showSynopsis(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: movie.Description // Pass the description string directly
    });
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
  
  addToFavorites(moviesId: string): void {
    this.fetchApiData.addFavoriteMovie(moviesId).subscribe(() => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
}


