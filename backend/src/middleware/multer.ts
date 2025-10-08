import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
   
    let folder = "avatars"; 
    if (req.originalUrl.includes("/posts")) {
      folder = "posts";
    }

    return {
      folder,
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: "auto", 
    };
  },
});

const upload = multer({ storage });

export default upload;
