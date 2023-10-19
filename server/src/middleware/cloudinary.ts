/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhivf8dyb",
  api_key: "177877774542481",
  api_secret: "X40FLcBUHlOpgikH9Mv6l3JGTyY",
});

export const uploadImg = (file: any) =>
  cloudinary.uploader.upload(
    `data:image/jpeg;base64,${file}`,
    { public_id: "hospital-img" },
    function (error: any, result: any) {
      if (error) {
        console.error(error);
      } else {
        return result;
      }
    }
  );
