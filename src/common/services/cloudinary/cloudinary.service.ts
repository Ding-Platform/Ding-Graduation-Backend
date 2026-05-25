import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { PROFILE_CONSTANTS } from '../../constants/profile.constants';
import { PROFILE_ERROR_MESSAGES } from '../../constants/profile-error-messages.constant';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadProfilePicture(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    // Validate file type
    if (
      !PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(
        file.mimetype as (typeof PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES)[number],
      )
    ) {
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.INVALID_FILE_TYPE);
    }

    // Validate file size
    if (file.size > PROFILE_CONSTANTS.UPLOAD.MAX_PROFILE_PICTURE_SIZE) {
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    try {
      const result = await this.uploadStream(file, {
        folder: 'profiles/pictures',
        public_id: `profile_${userId}_${Date.now()}`,
        transformation: [
          {
            width: PROFILE_CONSTANTS.UPLOAD.PROFILE_PICTURE_DIMENSIONS.WIDTH,
            height: PROFILE_CONSTANTS.UPLOAD.PROFILE_PICTURE_DIMENSIONS.HEIGHT,
            crop: 'fill',
            gravity: 'face',
          },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.UPLOAD_FAILED);
    }
  }

  async uploadCoverPhoto(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    // Validate file type
    if (
      !PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(
        file.mimetype as (typeof PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES)[number],
      )
    ) {
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.INVALID_FILE_TYPE);
    }

    // Validate file size
    if (file.size > PROFILE_CONSTANTS.UPLOAD.MAX_COVER_PHOTO_SIZE) {
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    try {
      const result = await this.uploadStream(file, {
        folder: 'profiles/covers',
        public_id: `cover_${userId}_${Date.now()}`,
        transformation: [
          {
            width: PROFILE_CONSTANTS.UPLOAD.COVER_PHOTO_DIMENSIONS.WIDTH,
            height: PROFILE_CONSTANTS.UPLOAD.COVER_PHOTO_DIMENSIONS.HEIGHT,
            crop: 'fill',
            gravity: 'center',
          },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new BadRequestException(PROFILE_ERROR_MESSAGES.UPLOAD_FAILED);
    }
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      // Don't throw error for delete failures
    }
  }

  /**
   * Upload a seller KYC document image (ID card front/back, face photo).
   * Stored under marketplace/seller-docs/{userId}/{docType}
   */
  async uploadSellerDocument(
    file: Express.Multer.File,
    userId: string,
    docType: 'id_front' | 'id_back' | 'face',
  ): Promise<string> {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type for ${docType}. Only JPEG, PNG, and WebP are allowed.`,
      );
    }
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      throw new BadRequestException(`${docType} image must be under 10MB.`);
    }

    try {
      const result = await this.uploadStream(file, {
        folder: `marketplace/seller-docs/${userId}`,
        public_id: `${docType}_${userId}_${Date.now()}`,
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });
      return result.secure_url;
    } catch (error) {
      console.error(
        `Cloudinary seller document upload error (${docType}):`,
        error,
      );
      throw new BadRequestException(`Failed to upload ${docType} image.`);
    }
  }

  /**
   * Upload marketplace order proof images (shipment or delivery receipt).
   */
  async uploadOrderProof(
    file: Express.Multer.File,
    orderId: string,
    userId: string,
    proofType: 'shipment' | 'delivery',
  ): Promise<string> {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid ${proofType} proof type. Only JPEG, PNG, and WebP are allowed.`,
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `${proofType} proof image must be under 10MB.`,
      );
    }

    try {
      const result = await this.uploadStream(file, {
        folder: `marketplace/orders/${orderId}`,
        public_id: `${proofType}_${userId}_${Date.now()}`,
        transformation: [
          { width: 1600, height: 1600, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });
      return result.secure_url;
    } catch (error) {
      console.error(`Cloudinary order proof upload error (${proofType}):`, error);
      throw new BadRequestException(`Failed to upload ${proofType} proof image.`);
    }
  }

  private uploadStream(
    file: Express.Multer.File,
    options: any,
  ): Promise<UploadApiResponse> {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    if (!cloudName || cloudName === 'your-cloud-name') {
      const mockUrl = `http://mock-cloudinary.com/${options.folder}/${options.public_id}.${options.resource_type === 'video' ? 'mp4' : 'jpg'}`;
      // Mock response
      return Promise.resolve({
        public_id: options.public_id || 'mock_public_id',
        version: 1,
        signature: 'mock_signature',
        width: 800,
        height: 600,
        format: options.resource_type === 'video' ? 'mp4' : 'jpg',
        resource_type: options.resource_type || 'image',
        created_at: new Date().toISOString(),
        tags: [],
        pages: 1,
        bytes: file.size,
        type: 'upload',
        etag: 'mock_etag',
        placeholder: false,
        url: mockUrl,
        secure_url: mockUrl,
        access_mode: 'public',
        original_filename: 'mock_filename',
        moderation: [],
        access_control: [],
        context: {},
        metadata: {},
      } as unknown as UploadApiResponse);
    }

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            const normalizedError: Error =
              error instanceof Error
                ? error
                : new Error('Cloudinary upload failed');
            return reject(normalizedError);
          }
          resolve(result!);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }

  extractPublicId(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }

  async uploadPostImage(
    file: Express.Multer.File,
    postId: string,
  ): Promise<{ url: string; publicId: string; width: number; height: number }> {
    const POST_CONSTANTS = await import('../../constants/post.constants').then(
      (m) => m.POST_CONSTANTS,
    );
    const ERROR_MESSAGES =
      await import('../../constants/error-messages.constant').then(
        (m) => m.ERROR_MESSAGES,
      );

    // Validate file type
    if (
      !POST_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(
        file.mimetype as (typeof POST_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES)[number],
      )
    ) {
      throw new BadRequestException(ERROR_MESSAGES.POST_INVALID_IMAGE_TYPE);
    }

    // Validate file size
    if (file.size > POST_CONSTANTS.VALIDATION.MAX_IMAGE_SIZE) {
      throw new BadRequestException(ERROR_MESSAGES.POST_IMAGE_TOO_LARGE);
    }

    try {
      const result = await this.uploadStream(file, {
        folder: `${POST_CONSTANTS.CLOUDINARY.FOLDER}/images`,
        public_id: `post_${postId}_${Date.now()}`,
        transformation: [
          {
            width: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_WIDTH,
            height: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_HEIGHT,
            crop: 'limit',
          },
          {
            quality: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.QUALITY,
            fetch_format: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,
          },
        ],
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      };
    } catch (error) {
      console.error('Cloudinary post image upload error:', error);
      throw new BadRequestException(ERROR_MESSAGES.POST_MEDIA_UPLOAD_FAILED);
    }
  }

  async uploadPostVideo(
    file: Express.Multer.File,
    postId: string,
  ): Promise<{ url: string; publicId: string; width: number; height: number }> {
    const POST_CONSTANTS = await import('../../constants/post.constants').then(
      (m) => m.POST_CONSTANTS,
    );
    const ERROR_MESSAGES =
      await import('../../constants/error-messages.constant').then(
        (m) => m.ERROR_MESSAGES,
      );

    // Validate file type
    if (
      !POST_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(
        file.mimetype as (typeof POST_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES)[number],
      )
    ) {
      throw new BadRequestException(ERROR_MESSAGES.POST_INVALID_VIDEO_TYPE);
    }

    // Validate file size
    if (file.size > POST_CONSTANTS.VALIDATION.MAX_VIDEO_SIZE) {
      throw new BadRequestException(ERROR_MESSAGES.POST_VIDEO_TOO_LARGE);
    }

    try {
      const result = await this.uploadStream(file, {
        folder: `${POST_CONSTANTS.CLOUDINARY.FOLDER}/videos`,
        public_id: `post_video_${postId}_${Date.now()}`,
        resource_type: 'video',
        transformation: [
          {
            width: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.MAX_WIDTH,
            height: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.MAX_HEIGHT,
            crop: 'limit',
          },
          {
            quality: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.QUALITY,
          },
        ],
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width || 0,
        height: result.height || 0,
      };
    } catch (error) {
      console.error('Cloudinary post video upload error:', error);
      throw new BadRequestException(ERROR_MESSAGES.POST_MEDIA_UPLOAD_FAILED);
    }
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

    // Upload images
    if (files.images && files.images.length > 0) {
      for (const image of files.images) {
        const result = await this.uploadPostImage(image, postId);
        imageUrls.push(result);
      }
    }

    // Upload videos
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
    const CHAT_CONSTANTS = {
      CLOUDINARY: {
        FOLDER: 'chat/media',
      },
    };

    let folder = `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/others`;
    let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto';

    switch (type) {
      case 'IMAGE':
        folder = `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/images`;
        resourceType = 'image';
        break;
      case 'VIDEO':
        folder = `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/videos`;
        resourceType = 'video';
        break;
      case 'AUDIO':
      case 'VOICE_NOTE':
        folder = `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/audio`;
        resourceType = 'video'; // Cloudinary treats audio as video
        break;
      case 'DOCUMENT':
      case 'FILE':
        folder = `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/files`;
        resourceType = 'raw';
        break;
    }

    try {
      const options: any = {
        folder,
        public_id: `msg_${type.toLowerCase()}_${messageId}_${Date.now()}`,
        resource_type: resourceType,
      };

      // Specific transformations
      if (type === 'IMAGE') {
        options.transformation = [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 1920, height: 1920, crop: 'limit' }, // Limit max resolution
        ];
      }

      const result = await this.uploadStream(file, options);

      const response: any = {
        url: result.secure_url,
        publicId: result.public_id,
        bytes: result.bytes,
        format: result.format,
      };

      if (result.width) response.width = result.width;
      if (result.height) response.height = result.height;
      if (result.duration) response.duration = result.duration;

      // Generate thumbnail for videos
      if (type === 'VIDEO') {
        const thumbUrl = cloudinary.url(result.public_id, {
          resource_type: 'video',
          format: 'jpg',
          start_offset: '0',
          transformation: [{ width: 300, crop: 'scale' }],
        });
        response.thumbnailUrl = thumbUrl;
      }

      return response;
    } catch (error) {
      console.error('Cloudinary message media upload error:', error);
      throw new BadRequestException('Failed to upload message media');
    }
  }
}
