import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const S3 = new AWS.S3();

const getUniqFileName = (originalName: string) => {
  const name = uuid();
  const ext = originalName.split(".").pop();
  return `${name}.${ext}`;
};

const uploadS3 = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.AWS_BUCKET_NAME!,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: Request, file: any, cb) {
      console.log(file);
      const fileName = getUniqFileName(file.originalname);
      const dir = "public_assets";
      const finalPath = `${dir}/${fileName}`;

      file.newName = fileName;

      cb(null, finalPath);
    },
  }),
});

export { uploadS3, S3 };
