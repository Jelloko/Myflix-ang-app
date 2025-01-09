import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying genre information in a dialog.
 * Used to show the name and description of a movie genre.
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>{{ data.genre.Name }}</h1>
    <div mat-dialog-content>
      <p>{{ data.genre.Description }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class GenreDialogComponent {
  /**
   * Creates an instance of GenreDialogComponent.
   * 
   * @param data - Data injected into the dialog, containing the genre information.
   * The `data` object should have the following structure:
   * ```typescript
   * {
   *   genre: {
   *     Name: string;        // Name of the genre
   *     Description: string; // Description of the genre
   *   }
   * }
   * ```
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}


