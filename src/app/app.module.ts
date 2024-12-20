import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this for ngModel support
import { MatDialogModule } from '@angular/material/dialog'; // Angular Material dialog
import { MatCardModule } from '@angular/material/card'; // Material card
import { MatInputModule } from '@angular/material/input'; // Material input
import { MatButtonModule } from '@angular/material/button'; // Material buttons
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent // Declare the UserRegistrationFormComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Necessary for form controls
    MatDialogModule, 
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


