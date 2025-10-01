import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Перевіряємо, чи це аватар чи пост
    let folder = "avatars"; // за замовчуванням
    if (req.originalUrl.includes("/posts")) {
      folder = "posts";
    }

    return {
      folder,
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: "auto", // підтримка будь-якого типу файлів
    };
  },
});

const upload = multer({ storage });

export default upload;
