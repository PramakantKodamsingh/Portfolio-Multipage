import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from 'src/utils/cloudinary.provider'; // ✅ adjust path as needed

@Injectable()
export class UploadService {
    async uploadFile(
        file: Express.Multer.File,
        folder = 'general',
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',     
                    folder,                    // uploads to specified Cloudinary folder
                    use_filename: true,        // uses the original filename
                    unique_filename: true,     // appends random string to ensure uniqueness
                    overwrite: true,           // overwrites if name exists (only if `unique_filename` is false)
                },
                (error, result) => {
                    if (error || !result) {
                        return reject(error || new Error('Upload failed with no result'));
                    }
                    resolve(result); // returns secure_url, public_id, etc.
                },
            );

            Readable.from(file.buffer).pipe(stream); // uploads buffer to Cloudinary
        });
    }
}
