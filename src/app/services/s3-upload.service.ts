import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { ObjectCannedACL } from "@aws-sdk/client-s3";

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
      credentials: undefined, // No credentials needed for public access
      forcePathStyle: true, // Required for public access
    });
  }

  async uploadFile(file: File): Promise<string> {
    const fileKey = `original-images/${file.name}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file,
      ContentType: file.type,
      ACL: ObjectCannedACL.public_read, // Make the uploaded file publicly accessible
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

  async listOriginalImages(): Promise<string[]> {
    return this.listImages('original-images/');
  }

  async listResizedImages(): Promise<string[]> {
    return this.listImages('resized-images/');
  }

  private async listImages(prefix: string): Promise<string[]> {
    const listParams = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    try {
      const data = await this.s3Client.send(new ListObjectsV2Command(listParams));
      return data.Contents?.map(item => `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${item.Key}`) || [];
    } catch (error) {
      console.error("Error listing images:", error);
      return [];
    }
  }
}



