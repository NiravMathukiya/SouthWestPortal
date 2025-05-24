import { uploadMultipleFilesToS3 } from "@/utils/s3client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploadResult = await uploadMultipleFilesToS3(formData);
    if (Object.keys(uploadResult).length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }
    return NextResponse.json({ files: uploadResult });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}