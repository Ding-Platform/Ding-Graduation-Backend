import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const uploadOptions = {
  storage: memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new BadRequestException('Invalid file type'), false);
  },
};
