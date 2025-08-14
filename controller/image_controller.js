// import generateSignedUrl from "../s3.js";

// export const getSignedUrl = async (request, response) => {
//   const url = await generateSignedUrl();
//   response.status(200).json({ url });
// };

// import createPresignedUrlWithClient from '../s3.js';

// export const getSignedUrl = async (request, response) => {
//   try {
//     // Extract parameters from request (filename, file type, etc.)
//     const { fileName, fileType, folder } = request.body; // or request.query

//     // Generate the presigned URL
//     const presignedUrl = await createPresignedUrlWithClient({
//       fileName,
//       fileType,
//       folder, // optional: specify S3 folder/path
//     });

//     // Return the presigned URL to client
//     response.status(200).json({
//       success: true,
//       uploadUrl: presignedUrl,
//       message: 'Presigned URL generated successfully',
//     });
//   } catch (error) {
//     console.error('Error generating presigned URL:', error);
//     response.status(500).json({
//       success: false,
//       error: 'Failed to generate presigned URL',
//       details: error.message,
//     });
//   }
// };

import createPresignedUrlWithClient from '../s3.js';
import dotenv from 'dotenv';

dotenv.config();

export const getSignedUrl = async (request, response) => {
  try {
    const { fileName, fileType, folder } = request.body;

    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_BUCKETNAME;
    const key = `${folder}/${fileName}`;

    // Generate the presigned URL
    const presignedUrl = await createPresignedUrlWithClient({
      region,
      bucket,
      key,
      fileType,
    });

    // Return the presigned URL to frontend
    response.status(200).json({
      success: true,
      uploadUrl: presignedUrl,
      message: 'Presigned URL generated successfully',
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    response.status(500).json({
      success: false,
      error: 'Failed to generate presigned URL',
      details: error.message,
    });
  }
};
