import path from 'path';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import BadRequestError from '../../errors/bad-request.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded');
  }

  const productImage = req.files.fileUpload;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Upload an Image');
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 1MB');
  }

  const imagePath = path.join(
    process.cwd(),
    'public/uploads',
    productImage.name
  );

  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

export const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    use_filename: true,
    folder: 'project-file-upload',
  });

  fs.unlinkSync(file.tempFilePath);

  return result.secure_url
}

