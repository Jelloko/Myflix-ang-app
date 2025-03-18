import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { S3UploadService } from '../services/s3-upload.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
  providers: [DatePipe] // Provide DatePipe in this component
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  isEditing: boolean = false;
  selectedFile: File | null = null;
  uploadedUrl: string | null = null;

  constructor(
    public fetchApiData: UserRegistrationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private http: HttpClient,
    private s3UploadService: S3UploadService
  ) {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    if (this.userData?.Name) {
      this.getUser();
    } else {
      console.error('User data is missing');
    }
    this.loadItems();
  }

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getFormattedBirthday(): string | null {
    if (this.userData.Birthday) {
      return this.datePipe.transform(this.userData.Birthday, 'longDate');
    }
    return null;
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (res: any) => {
        this.userData = res;
        localStorage.setItem('currentUser', JSON.stringify(this.userData));
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        this.isEditing = false;
      },
      (err: any) => {
        console.error(err);
        this.snackBar.open('Failed to update profile.', 'OK', { duration: 3000 });
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  backToMovie(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('currentUser');
  }

  uploadFile(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (!fileInput.files?.length) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    this.http.post<{ message: string }>('/api/upload', formData).subscribe({
      next: (response) => {
        alert(response.message);
        this.loadItems();
      },
      error: (error) => console.error('Upload error:', error)
    });
  }

  loadItems(): void {
    this.http.get<{ original: any[], resized: any[] }>('/api/images').subscribe({
      next: (data) => {
        const originalContainer = document.getElementById('originalImages');
        const resizedContainer = document.getElementById('resizedImages');

        if (originalContainer) originalContainer.innerHTML = '';
        if (resizedContainer) resizedContainer.innerHTML = '';

        data.original.forEach(file => {
          const img = document.createElement('img');
          img.src = file.url;
          originalContainer?.appendChild(img);
        });

        data.resized.forEach(file => {
          const img = document.createElement('img');
          img.src = file.url;
          resizedContainer?.appendChild(img);
        });
      },
      error: (error) => console.error('Error loading images:', error)
    });
  }

  async upload() {
    if (!this.selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      this.uploadedUrl = await this.s3UploadService.uploadFile(this.selectedFile);
    } catch (error) {
      alert("Upload failed!");
    }
  }
}
