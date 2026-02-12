import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  MessageMediaDocument,
  MessageMediaType,
  MESSAGE_MEDIA_COLLECTION,
} from '../schemas/message.schema';
import {
  CHAT_CONSTANTS,
  CHAT_ERROR_MESSAGES,
} from 'src/common/constants/chat.constants';

@Injectable()
export class ChatMediaService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly mongodbService: MongodbService,
  ) {}

  /**
   * Upload a chat image
   */
  async uploadImage(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    // Validate file type
    if (
      !CHAT_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(
        file.mimetype as (typeof CHAT_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES)[number],
      )
    ) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
    }

    // Validate file size
    if (file.size > CHAT_CONSTANTS.UPLOAD.MAX_IMAGE_SIZE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
    }

    try {
      const result = await this.uploadToCloudinary(file, 'images', messageId);

      const mediaDoc: MessageMediaDocument = {
        messageId,
        url: result.url,
        type: 'IMAGE',
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        width: result.width,
        height: result.height,
        publicId: result.publicId,
        createdAt: new Date(),
      };

      return mediaDoc;
    } catch (error) {
      console.error('Chat image upload error:', error);
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
    }
  }

  /**
   * Upload a chat video
   */
  async uploadVideo(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    // Validate file type
    if (
      !CHAT_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(
        file.mimetype as (typeof CHAT_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES)[number],
      )
    ) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
    }

    // Validate file size
    if (file.size > CHAT_CONSTANTS.UPLOAD.MAX_VIDEO_SIZE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
    }

    try {
      const result = await this.uploadToCloudinary(
        file,
        'videos',
        messageId,
        'video',
      );

      const mediaDoc: MessageMediaDocument = {
        messageId,
        url: result.url,
        type: 'VIDEO',
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        width: result.width,
        height: result.height,
        duration: result.duration,
        thumbnail: result.thumbnail,
        publicId: result.publicId,
        createdAt: new Date(),
      };

      return mediaDoc;
    } catch (error) {
      console.error('Chat video upload error:', error);
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
    }
  }

  /**
   * Upload an audio file
   */
  async uploadAudio(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    // Validate file type
    if (
      !CHAT_CONSTANTS.UPLOAD.ALLOWED_AUDIO_TYPES.includes(
        file.mimetype as (typeof CHAT_CONSTANTS.UPLOAD.ALLOWED_AUDIO_TYPES)[number],
      )
    ) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
    }

    // Validate file size
    if (file.size > CHAT_CONSTANTS.UPLOAD.MAX_AUDIO_SIZE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
    }

    try {
      const result = await this.uploadToCloudinary(
        file,
        'audio',
        messageId,
        'video',
      ); // Cloudinary treats audio as video

      const mediaDoc: MessageMediaDocument = {
        messageId,
        url: result.url,
        type: 'AUDIO',
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        duration: result.duration,
        publicId: result.publicId,
        createdAt: new Date(),
      };

      return mediaDoc;
    } catch (error) {
      console.error('Chat audio upload error:', error);
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
    }
  }

  /**
   * Upload a voice note
   */
  async uploadVoiceNote(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    // Voice notes typically come as audio/webm or audio/ogg
    if (file.size > CHAT_CONSTANTS.UPLOAD.MAX_VOICE_NOTE_SIZE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
    }

    try {
      const result = await this.uploadToCloudinary(
        file,
        'voice-notes',
        messageId,
        'video',
      );

      const mediaDoc: MessageMediaDocument = {
        messageId,
        url: result.url,
        type: 'VOICE_NOTE',
        fileName: file.originalname || 'voice_note',
        fileSize: file.size,
        mimeType: file.mimetype,
        duration: result.duration,
        publicId: result.publicId,
        createdAt: new Date(),
      };

      return mediaDoc;
    } catch (error) {
      console.error('Chat voice note upload error:', error);
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
    }
  }

  /**
   * Upload a document
   */
  async uploadDocument(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    // Validate file size
    if (file.size > CHAT_CONSTANTS.UPLOAD.MAX_DOCUMENT_SIZE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
    }

    try {
      const result = await this.uploadToCloudinary(
        file,
        'documents',
        messageId,
        'raw',
      );

      const mediaDoc: MessageMediaDocument = {
        messageId,
        url: result.url,
        type: 'DOCUMENT',
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        publicId: result.publicId,
        createdAt: new Date(),
      };

      return mediaDoc;
    } catch (error) {
      console.error('Chat document upload error:', error);
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
    }
  }

  /**
   * Upload multiple media files
   */
  async uploadMultiple(
    files: Express.Multer.File[],
    messageId: string,
  ): Promise<MessageMediaDocument[]> {
    if (files.length > CHAT_CONSTANTS.MESSAGE.MAX_MEDIA_PER_MESSAGE) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.TOO_MANY_MEDIA_FILES);
    }

    const uploadPromises = files.map((file) =>
      this.uploadFile(file, messageId),
    );
    return Promise.all(uploadPromises);
  }

  /**
   * Upload a file and determine its type
   */
  async uploadFile(
    file: Express.Multer.File,
    messageId: string,
  ): Promise<MessageMediaDocument> {
    const mimeType = file.mimetype;

    if (CHAT_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(mimeType as any)) {
      return this.uploadImage(file, messageId);
    }

    if (CHAT_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(mimeType as any)) {
      return this.uploadVideo(file, messageId);
    }

    if (CHAT_CONSTANTS.UPLOAD.ALLOWED_AUDIO_TYPES.includes(mimeType as any)) {
      return this.uploadAudio(file, messageId);
    }

    // Default to document upload
    return this.uploadDocument(file, messageId);
  }

  /**
   * Save media to database
   */
  async saveMedia(media: MessageMediaDocument): Promise<MessageMediaDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    const result = await mediaCollection.insertOne(media);
    media._id = result.insertedId;
    return media;
  }

  /**
   * Save multiple media to database
   */
  async saveMultipleMedia(
    media: MessageMediaDocument[],
  ): Promise<MessageMediaDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    if (media.length === 0) {
      return [];
    }

    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    const result = await mediaCollection.insertMany(media);

    return media.map((m, index) => ({
      ...m,
      _id: result.insertedIds[index],
    }));
  }

  /**
   * Delete media from Cloudinary
   */
  async deleteMedia(publicId: string): Promise<void> {
    try {
      await this.cloudinaryService.deleteFile(publicId);
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  }

  /**
   * Get media for a message
   */
  async getMessageMedia(messageId: string): Promise<MessageMediaDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    return mediaCollection.find({ messageId }).toArray();
  }

  /**
   * Helper method to upload to Cloudinary
   */
  private async uploadToCloudinary(
    file: Express.Multer.File,
    subfolder: string,
    messageId: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
  ): Promise<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail?: string;
  }> {
    // Use the CloudinaryService's internal upload method via a workaround
    // Since CloudinaryService doesn't expose a generic upload, we'll implement directly here
    const { v2: cloudinary } = await import('cloudinary');
    const streamifier = await import('streamifier');

    return new Promise((resolve, reject) => {
      const uploadOptions: any = {
        folder: `${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/${subfolder}`,
        public_id: `chat_${messageId}_${Date.now()}`,
        resource_type: resourceType,
      };

      if (resourceType === 'image') {
        uploadOptions.transformation = [
          {
            width: CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_WIDTH,
            height: CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_HEIGHT,
            crop: 'limit',
          },
          {
            quality: CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.QUALITY,
            fetch_format: CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,
          },
        ];
      }

      const upload = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result!.secure_url,
            publicId: result!.public_id,
            width: result?.width,
            height: result?.height,
            duration: result?.duration,
            thumbnail:
              resourceType === 'video'
                ? result?.secure_url.replace(/\.[^.]+$/, '.jpg')
                : undefined,
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }
}
