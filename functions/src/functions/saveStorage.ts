import * as admin from "firebase-admin";


export default async function saveStorage(
    bucketname: string,
    filepath: string,
    value: any
) {
    const bucket = admin.storage().bucket(bucketname);
    const file = bucket.file(filepath);
    await file.save(value, {
        contentType: 'application/pdf',
        public: true,
    });

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 3600 * 1000, // 1 hour from now
    });

    return url;
}