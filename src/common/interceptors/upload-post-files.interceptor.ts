import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from '../../configs/multer/upload-options';

@Injectable()
export class UploadPostFilesInterceptor implements NestInterceptor {
  constructor(private readonly fieldsConfig: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Create a Multer-specific interceptor ON THE FLY
    const multerInterceptor = FileFieldsInterceptor(
      this.fieldsConfig,
      uploadOptions,
    );

    // Execute Multer interceptor first before continuing
    return new (multerInterceptor as any)().intercept(context, next);
  }
}
