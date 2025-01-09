import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';

/**
 * Defines the routes for the application.
 */
const routes: Routes = [
  /**
   * Route to the welcome page.
   * Path: 'welcome'
   */
  { path: 'welcome', component: WelcomePageComponent },

  /**
   * Route to the movie card page displaying the list of movies.
   * Path: 'movies'
   */
  { path: 'movies', component: MovieCardComponent },

  /**
   * Route to the user profile page.
   * Path: 'profile'
   */
  { path: 'profile', component: UserProfileComponent },

  /**
   * Default route redirects to the welcome page.
   * Path: ''
   * Redirects to: 'welcome'
   */
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * Angular module for application routing.
 *
 * @remarks
 * - Configures the routes using the `RouterModule`.
 * - Exports the configured `RouterModule` for use in other modules.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

