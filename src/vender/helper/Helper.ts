import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION
};

// Multer upload options
export const multerOptions = {
    // Enable file size limits
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(
                new HttpException(
                    `Unsupported file type ${
                        path.parse(file.originalname).ext
                    }`,
                    HttpStatus.BAD_REQUEST
                ),
                false
            );
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: './public/image',
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            const filename: string = uuid();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        }
    })
};

// Multer upload options
export const multerBannerOptions = {
    // Enable file size limits
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(
                new HttpException(
                    `Unsupported file type ${
                        path.parse(file.originalname).ext
                    }`,
                    HttpStatus.BAD_REQUEST
                ),
                false
            );
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: './public/image/banner',
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            const filename: string = uuid();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        }
    })
};
