// import aws from "aws-sdk";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import { promisify } from "util";

// dotenv.config();

// const randomBytes = promisify(crypto.randomBytes);

// const region = process.env.AWS_REGION;
// console.log(region);
// const accessKeyID = process.env.AWS_ACCESSKEYID;
// console.log(accessKeyID);

// const secretAccessKey = process.env.AWS_SECRETACCESSKEYID;
// console.log(secretAccessKey);

// const bucketName = process.env.AWS_BUCKETNAME;
// console.log(bucketName);

// const s3 = new aws.S3({
//   region,
//   accessKeyID,
//   secretAccessKey,
//   signatureVersion: "v4",
// });
// console.log("heelo");
// console.log(s3);

// const generateSignedUrl = async () => {
//   const bytes = await randomBytes(16);
//   const imageName = bytes.toString("hex");
//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60,
//   };
//   console.log(params);
//   const signedUrl = await s3.getSignedUrlPromise("putObject", params);
//   console.log(signedUrl);
//   return signedUrl;
// };

// export default generateSignedUrl;
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

const createPresignedUrlWithClient = ({ region, bucket, key, contentType }) => {
  // Verify required environment variables are set
  if (!process.env.AWS_ACCESSKEYID || !process.env.AWS_SECRETACCESSKEYID) {
    throw new Error(
      'AWS credentials are not configured in environment variables'
    );
  }

  const client = new S3Client({
    region: region || process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEYID,
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType, // Important for browser uploads
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export default createPresignedUrlWithClient;
