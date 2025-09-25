import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "avatars", // Папка в Cloudinary
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: "auto", // важливо! дозволяє будь-який тип файлів
    };
  },
});

const upload = multer({ storage });

export default upload;
