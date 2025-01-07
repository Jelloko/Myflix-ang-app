import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

