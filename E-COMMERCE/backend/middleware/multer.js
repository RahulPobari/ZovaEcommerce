import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname); // optional: add Date.now() to avoid name clash
  }
});

const upload = multer({ storage });

export default upload;