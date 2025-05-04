const multer = require('multer');
const path = require('path');

// Where to save the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save the images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;  
