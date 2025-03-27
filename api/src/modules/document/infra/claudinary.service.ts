import { Injectable } from '@nestjs/common';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    constructor() {
        cloudinaryV2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    public async uploadFile(params: {
        file: Express.Multer.File;
        fileId: string;
    }): Promise<string> {
        const { file, fileId } = params;

        return new Promise((resolve, reject) => {
            cloudinaryV2.uploader.upload_stream(
                {
                    folder: 'documents',
                    filename_override: fileId,
                    public_id: fileId,
                    unique_filename: true,
                },
                (error, result) => {
                    if (error || !result) {
                        console.log(error);
                        return reject(`Erro ao fazer upload`);
                    }
                    resolve(result.secure_url);
                },
            ).end(file.buffer);
        });
    }

}