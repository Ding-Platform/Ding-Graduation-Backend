"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_CONSTANTS = void 0;
exports.POST_CONSTANTS = {
    VALIDATION: {
        MAX_CONTENT_LENGTH: 10000,
        MAX_IMAGES: 5,
        MAX_VIDEOS: 2,
        MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
        MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB in bytes
    },
    UPLOAD: {
        ALLOWED_IMAGE_TYPES: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
        ],
        ALLOWED_VIDEO_TYPES: [
            'video/mp4',
            'video/webm',
            'video/quicktime',
        ],
    },
    CLOUDINARY: {
        FOLDER: 'posts',
        IMAGE_TRANSFORMATION: {
            MAX_WIDTH: 1920,
            MAX_HEIGHT: 1080,
            QUALITY: 'auto',
            FORMAT: 'auto',
        },
        VIDEO_TRANSFORMATION: {
            MAX_WIDTH: 1920,
            MAX_HEIGHT: 1080,
            QUALITY: 'auto',
        },
    },
};
