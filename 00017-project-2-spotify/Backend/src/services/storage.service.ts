import ImageKit from '@imagekit/nodejs';
import { env } from '../config/env.js';

const client = new ImageKit({
    privateKey: env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});



function bufferToBase64(buffer: Buffer): string {
    return buffer.toString('base64');
}

const uploadFile = async (file: Buffer, fileName: string, folder: string = "spotify"): Promise<string> => {


    const uploadResponse = await client.files.upload({
        file: bufferToBase64(file),
        fileName: fileName,
        folder: folder,
    })

    if(!uploadResponse || !uploadResponse.url) {
        throw new Error("Failed to upload file to ImageKit");
    }

    return uploadResponse.url;

}

export { uploadFile };