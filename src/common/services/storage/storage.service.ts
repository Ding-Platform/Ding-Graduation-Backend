import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import type { Request } from 'express';

@Injectable()
export class StorageService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    this.ensureDirectoryExists(this.uploadDir);
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private async saveFile(
    file: Express.Multer.File,
    subfolder: string,
    filename: string,
  ): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file upload. Buffer is empty.');
    }

    const folderPath = path.join(this.uploadDir, subfolder);
    this.ensureDirectoryExists(folderPath);

    const ext = path.extname(file.originalname) || '';
    const fullFileName = `${filename}${ext}`;
    const filePath = path.join(folderPath, fullFileName);

    await fs.promises.writeFile(filePath, file.buffer);

    // Return the relative URL starting with /uploads
    return `/uploads/${subfolder}/${fullFileName}`;
  }

  async saveRawStream(
    req: Request,
    subfolder: string,
    filename: string,
  ): Promise<string> {
    const folderPath = path.join(this.uploadDir, subfolder);
    this.ensureDirectoryExists(folderPath);

    const ext =
      req.headers['content-type'] === 'video/mp4'
        ? '.mp4'
        : req.headers['content-type'] === 'video/quicktime'
          ? '.mov'
          : req.headers['content-type'] === 'video/webm'
            ? '.webm'
            : '.mp4';

    const fullFileName = `${filename}${ext}`;
    const filePath = path.join(folderPath, fullFileName);

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);

      req.pipe(writeStream);

      req.on('end', () => {
        resolve(`/uploads/${subfolder}/${fullFileName}`);
      });

      req.on('error', (err) => {
        writeStream.close();
        fs.unlink(filePath, () => {});
        reject(
          new InternalServerErrorException('Failed to read upload stream'),
        );
      });

      writeStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(
          new InternalServerErrorException('Failed to write upload stream'),
        );
      });
    });
  }

  async uploadProfilePicture(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const filename = `profile_${userId}_${Date.now()}`;
    return this.saveFile(file, 'profiles/pictures', filename);
  }

  async uploadCoverPhoto(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const filename = `cover_${userId}_${Date.now()}`;
    return this.saveFile(file, 'profiles/covers', filename);
  }

  async deleteFile(publicIdOrUrl: string): Promise<void> {
    try {
      // If a full url is provided, extract the path part
      let relativePath = publicIdOrUrl;
      if (publicIdOrUrl.startsWith('http')) {
        const url = new URL(publicIdOrUrl);
        relativePath = url.pathname; // e.g. /uploads/profiles/pictures/...
      }

      if (relativePath.startsWith('/uploads')) {
        const absolutePath = path.join(process.cwd(), relativePath);
        if (fs.existsSync(absolutePath)) {
          await fs.promises.unlink(absolutePath);
        }
      }
    } catch (error) {
      console.error('Storage delete error:', error);
    }
  }

  async uploadSellerDocument(
    file: Express.Multer.File,
    userId: string,
    docType: 'id_front' | 'id_back' | 'face',
  ): Promise<string> {
    const filename = `${docType}_${userId}_${Date.now()}`;
    return this.saveFile(file, `marketplace/seller-docs/${userId}`, filename);
  }

  async uploadOrderProof(
    file: Express.Multer.File,
    orderId: string,
    userId: string,
    proofType: 'shipment' | 'delivery',
  ): Promise<string> {
    const filename = `${proofType}_${userId}_${Date.now()}`;
    return this.saveFile(file, `marketplace/orders/${orderId}`, filename);
  }

  async uploadPostImage(
    file: Express.Multer.File,
    postId: string,
  ): Promise<{ url: string; publicId: string; width: number; height: number }> {
    const filename = `post_${postId}_${Date.now()}`;
    const url = await this.saveFile(file, 'posts/images', filename);
    return {
      url,
      publicId: url,
      width: 0,
      height: 0,
    };
  }

  async uploadPostVideo(
    file: Express.Multer.File,
    postId: string,
  ): Promise<{ url: string; publicId: string; width: number; height: number }> {
    const filename = `post_video_${postId}_${Date.now()}`;
    const url = await this.saveFile(file, 'posts/videos', filename);
    return {
      url,
      publicId: url,
      width: 0,
      height: 0,
    };
  }

  async uploadMultiplePostMedia(
    files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
    postId: string,
  ): Promise<{
    imageUrls: Array<{
      url: string;
      publicId: string;
      width: number;
      height: number;
    }>;
    videoUrls: Array<{
      url: string;
      publicId: string;
      width: number;
      height: number;
    }>;
  }> {
    const imageUrls: Array<{
      url: string;
      publicId: string;
      width: number;
      height: number;
    }> = [];
    const videoUrls: Array<{
      url: string;
      publicId: string;
      width: number;
      height: number;
    }> = [];

    if (files.images && files.images.length > 0) {
      for (const image of files.images) {
        const result = await this.uploadPostImage(image, postId);
        imageUrls.push(result);
      }
    }

    if (files.videos && files.videos.length > 0) {
      for (const video of files.videos) {
        const result = await this.uploadPostVideo(video, postId);
        videoUrls.push(result);
      }
    }

    return { imageUrls, videoUrls };
  }

  async uploadMessageMedia(
    file: Express.Multer.File,
    messageId: string,
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'VOICE_NOTE' | 'DOCUMENT' | 'FILE',
  ): Promise<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
    duration?: number;
    thumbnailUrl?: string;
  }> {
    let folder = 'chat/media/others';
    switch (type) {
      case 'IMAGE':
        folder = 'chat/media/images';
        break;
      case 'VIDEO':
        folder = 'chat/media/videos';
        break;
      case 'AUDIO':
      case 'VOICE_NOTE':
        folder = 'chat/media/audio';
        break;
      case 'DOCUMENT':
      case 'FILE':
        folder = 'chat/media/files';
        break;
    }

    const filename = `msg_${type.toLowerCase()}_${messageId}_${Date.now()}`;
    const url = await this.saveFile(file, folder, filename);

    return {
      url,
      publicId: url,
      bytes: file.size,
      format: path.extname(file.originalname).replace('.', '') || 'unknown',
    };
  }

  // Helper method for chat media service
  async uploadGenericFile(
    file: Express.Multer.File,
    subfolder: string,
    prefix: string,
  ): Promise<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail?: string;
  }> {
    const filename = `${prefix}_${Date.now()}`;
    const url = await this.saveFile(file, subfolder, filename);
    return {
      url,
      publicId: url,
      width: 0,
      height: 0,
      duration: 0,
    };
  }
}
