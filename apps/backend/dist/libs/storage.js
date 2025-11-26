"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucket = process.env.AWS_BUCKET_NAME;
async function uploadFile(file, folder) {
    const ext = file.originalname.split('.').pop();
    const name = `${(0, uuid_1.v4)()}.${ext}`;
    const key = `${folder}/${name}`;
    await s3.send(new client_s3_1.PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    }));
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
async function deleteFile(key) {
    await s3.send(new client_s3_1.DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    }));
}
