import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-cf-fd6a3633859c.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(public http: HttpClient, private snackBar: MatSnackBar) {
  }

// Function to get the token
public getStoredToken(): any {
  const token = localStorage.getItem('token');
  if (!token) {
    this.snackBar.open('Authentication token is missing.', 'OK', {
      duration: 3000,
    });
  }
  console.log('Stored Token:', token); // Debugging line
  return token;
}

// Function to get the user
public getStoredUser(): any {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    this.snackBar.open('User information is missing.', 'OK', { duration: 3000 });
  }
  console.log('Stored User:', user); // Debugging line
  return user ? JSON.parse(user) : null; // Parse JSON here
}


 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Get one movie
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(directorName: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/Director/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(genreName: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/Genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get a single user by name
public getUserByName(name: string) {
  const token = this.getStoredToken();
  return this.http.get(apiUrl + 'users/' + name, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


  // Get all users
  public getAllUsers() {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite Movies
public addFavoriteMovie(moviesId: string): Observable<any> {
  const token = this.getStoredToken();
  const user = this.getStoredUser();  // This returns the full user object

  if (!token || !user || !user.Name) {
    console.error('Authentication token or user is missing.');
    return throwError(() => new Error('Authentication token or user is missing.'));
  }

  return this.http.put(
    `${apiUrl}users/${user.Name}/FavoriteMovies/${moviesId}`,  // Use user.Name here
    {},  // You can pass an empty object if no body content is required
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }
  ).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


  // Delete a movie from favourite Movies
  public deleteFavoriteMovie(moviesId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.delete(apiUrl + 'users/' + user.name + '/FavoriteMovies/' + moviesId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.put(apiUrl + 'users/' + user.Name, userDetails, {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.delete(apiUrl + 'users/' + user.name,  {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  public extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
