"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadPostFiles = UploadPostFiles;
var common_1 = require("@nestjs/common");
var upload_post_files_interceptor_1 = require("../interceptors/upload-post-files.interceptor");
function UploadPostFiles(fieldsConfig) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(new upload_post_files_interceptor_1.UploadPostFilesInterceptor(fieldsConfig)));
}
