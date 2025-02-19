/**
 * @fileoverview Provides the UserRegistrationService for handling user authentication, registration, and interaction with the movie API.
 */

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Base URL for the API endpoints.
 */
const apiUrl = 'http://54.89.73.146/';

/**
 * Injectable service to manage user registration, authentication, and API interactions.
 */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  /**
   * @param http HttpClient instance for making HTTP requests.
   * @param snackBar MatSnackBar instance for displaying notifications.
   */
  constructor(public http: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Retrieves the stored authentication token from localStorage.
   * @returns The stored token, or null if not found.
   */
  public getStoredToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Authentication token is missing.', 'OK', {
        duration: 3000,
      });
    }
    console.log('Stored Token:', token);
    return token;
  }

  /**
   * Retrieves the stored user information from localStorage.
   * @returns The stored user as a parsed object, or null if not found.
   */
  public getStoredUser(): any {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      this.snackBar.open('User information is missing.', 'OK', { duration: 3000 });
    }
    console.log('Stored User:', user);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Registers a new user.
   * @param userDetails Object containing user registration details.
   * @returns An Observable for the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param userDetails Object containing login credentials.
   * @returns An Observable for the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies.
   * @returns An Observable containing the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a specific movie by title.
   * @param title The title of the movie.
   * @returns An Observable containing movie details.
   */
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a director.
   * @param directorName The name of the director.
   * @returns An Observable containing director details.
   */
  public getDirector(directorName: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/Director/' + directorName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a genre.
   * @param genreName The name of the genre.
   * @returns An Observable containing genre details.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/Genre/' + genreName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves user details by username.
   * @param name The username to retrieve.
   * @returns An Observable containing user details.
   */
  public getUserByName(name: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'users/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all users.
   * @returns An Observable containing the list of users.
   */
  public getAllUsers(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * @param moviesId The ID of the movie to add.
   * @returns An Observable for the API response.
   */
  public addFavoriteMovie(moviesId: string): Observable<any> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();

    if (!token || !user || !user.Name) {
      console.error('Authentication token or user is missing.');
      return throwError(() => new Error('Authentication token or user is missing.'));
    }

    return this.http.put(
      `${apiUrl}users/${user.Name}/FavoriteMovies/${moviesId}`,
      {},
      { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param moviesId The ID of the movie to remove.
   * @returns An Observable for the API response.
   */
  public deleteFavoriteMovie(moviesId: string): Observable<any> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return this.http.delete(`${apiUrl}users/${user.Name}/FavoriteMovies/${moviesId}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits user details.
   * @param userDetails Object containing updated user details.
   * @returns An Observable for the API response.
   */
  public editUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return this.http.put(`${apiUrl}users/${user.Name}`, userDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user account.
   * @param userDetails Object containing user details to identify the user.
   * @returns An Observable for the API response.
   */
  public deleteUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return this.http.delete(`${apiUrl}users/${user.name}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error to handle.
   * @returns An Observable throwing the error.
   */
  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /**
   * Extracts data from an HTTP response.
   * @param res The HTTP response to extract data from.
   * @returns The extracted response body.
   */
  public extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
