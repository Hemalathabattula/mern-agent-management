const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndDistribute, getLists } = require('../controllers/listController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV, XLS, XLSX allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post('/upload', protect, upload.single('file'), uploadAndDistribute);
router.get('/', protect, getLists);

module.exports = router;
