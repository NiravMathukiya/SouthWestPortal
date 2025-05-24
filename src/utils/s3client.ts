import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { randomUUID } from "crypto";
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});
async function uploadFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const folder = process.env.AWS_S3_FOLDER_NAME || ""; // change this to your folder path
  const key = `${folder}ccf-${Date.now()}-${randomUUID()}${ext}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });
  await s3.send(command);
  return `${key}`;
}
export async function uploadMultipleFilesToS3(
  formData: FormData
): Promise<
  Record<
    string,
    | { originalName: string; uploadedName: string }
    | { originalName: string; uploadedName: string }[]
  >
> {
  const tempResult: Record<
    string,
    { originalName: string; uploadedName: string }[]
  > = {};
  for (const [fieldName, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(value, "file====");
      const uploadedName = await uploadFile(value); // Upload to S3
      if (!tempResult[fieldName]) {
        tempResult[fieldName] = [];
      }
      tempResult[fieldName].push({
        originalName: value.name,
        uploadedName,
      });
    }
  }
  const finalResult: Record<
    string,
    | { originalName: string; uploadedName: string }
    | { originalName: string; uploadedName: string }[]
  > = {};
  for (const key in tempResult) {
    const files = tempResult[key];
    finalResult[key] = files.length === 1 ? files[0] : files;
  }
  return finalResult;
}