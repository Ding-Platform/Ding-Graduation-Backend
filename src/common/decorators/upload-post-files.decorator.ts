import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { UploadPostFilesInterceptor } from '../interceptors/upload-post-files.interceptor';

export function UploadPostFiles(fieldsConfig: any) {
  return applyDecorators(
    UseInterceptors(new UploadPostFilesInterceptor(fieldsConfig)),
  );
}
