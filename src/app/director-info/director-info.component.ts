import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying director information in a dialog.
 * Used to show details about a movie's director, including their bio, birth, and death details (if applicable).
 */
@Component({
  selector: 'app-director-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>{{ data.director.Name }}</h1>
    <div mat-dialog-content>
      <p>Bio: {{ data.director.Bio }}</p>
      <p>Birth: {{ data.director.Birth }}</p>
      <p>Death: {{ data.director.Death }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class DirectorDialogComponent {
  /**
   * Creates an instance of DirectorDialogComponent.
   * 
   * @param data - Data injected into the dialog, containing the director's information.
   * The `data` object should have the following structure:
   * ```typescript
   * {
   *   director: {
   *     Name: string;        // Name of the director
   *     Bio: string;         // Short biography of the director
   *     Birth: string;       // Birth date of the director
   *     Death?: string;      // Death date of the director (if applicable)
   *   }
   * }
   * ```
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}


