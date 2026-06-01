"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOptions = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
exports.uploadOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/media',
        filename: function (req, file, cb) {
            var unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + (0, path_1.extname)(file.originalname));
        },
    }),
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
    fileFilter: function (req, file, cb) {
        var allowed = ['image/png', 'image/jpeg', 'video/mp4'];
        if (allowed.includes(file.mimetype))
            cb(null, true);
        else
            cb(new Error('Invalid file type'), false);
    },
};
