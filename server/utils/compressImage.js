import fs from "fs";
import sharp from "sharp";
export const compressImage = (path) => {
  const newName = `${Date.now()}.jpeg`;
  const newPath = `./public/storage/${newName}`;
  sharp(path)
    .resize()
    .jpeg({ quality: 50 })
    .toFile(newPath)
    .then(() => {
      fs.unlinkSync(path);
    })
    .catch(() => {});
  return newName;
};
