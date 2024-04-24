import fs from "fs";
import sharp from "sharp";
export const compressImage = (file, index) => {
  let newName = `${Date.now()}-${index}.jpeg`;
  const newPath = `./public/storage/${newName}`;
  sharp(file.path)
    .resize()
    .jpeg({ quality: 50 })
    .toFile(newPath)
    .then(() => {
      fs.unlinkSync(file.path);
    })
    .catch(() => {
      newName = file.filename;
    });
  return newName;
};
