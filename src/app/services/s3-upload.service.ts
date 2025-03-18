import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {
  private bucketName = "final-task-resize"; // Replace with your actual bucket
  private region = "us-east-1"; // Replace with your region
  private baseUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com`;

  constructor(private http: HttpClient) {}

  async uploadFile(file: File): Promise<string> {
    const fileKey = `original-images/${file.name}`;
    const uploadUrl = `${this.baseUrl}/${fileKey}`;

    try {
      // Upload the file using a PUT request
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log("Upload successful:", fileKey);
      return uploadUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  async listOriginalImages(): Promise<string[]> {
    return this.listImages('original-images/');
  }

  async listResizedImages(): Promise<string[]> {
    return this.listImages('resized-images/');
  }

  private async listImages(prefix: string): Promise<string[]> {
    const listUrl = `${this.baseUrl}/?prefix=${prefix}`;

    try {
      // Fetch the list of objects in the bucket
      const response = await fetch(listUrl);
      const text = await response.text();

      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      // Extract the keys (file names) from the XML
      const keys = Array.from(xmlDoc.getElementsByTagName('Key')).map(
        (key) => key.textContent || ''
      );

      // Generate URLs for the images
      return keys.map((key) => `${this.baseUrl}/${key}`);
    } catch (error) {
      console.error("Error listing images:", error);
      return [];
    }
  }
}



