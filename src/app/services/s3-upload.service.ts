import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {
  private s3Client: S3Client;
  private bucketName = "final-task-resize"; // Replace with your actual bucket
  private region = "us-east-1"; // Replace with your region

  constructor() {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: undefined
    });
  }

  async uploadFile(file: File): Promise<string> {
    const fileKey = `original-images/${file.name}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file,
      ContentType: file.type
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      console.log("Upload successful:", fileKey);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileKey}`;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }
}

