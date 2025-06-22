const multer = require('multer');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: fileFilter
});

// Middleware for single image upload
const uploadSingle = (fieldName = 'image') => {
  return upload.single(fieldName);
};

// Middleware for multiple image uploads
const uploadMultiple = (fieldName = 'images', maxCount = 10) => {
  return upload.array(fieldName, maxCount);
};

// Middleware for mixed uploads (profile + pet images)
const uploadFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'petImages', maxCount: 10 }
]);

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 10 files.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (err.message.includes('Only image files')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next(err);
};

// Validation middleware for required files
const requireFiles = (fieldName, minCount = 1) => {
  return (req, res, next) => {
    const files = req.files;
    const file = req.file;
    
    if (fieldName === 'single') {
      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'Image file is required.'
        });
      }
    } else if (Array.isArray(files)) {
      if (!files || files.length < minCount) {
        return res.status(400).json({
          success: false,
          message: `At least ${minCount} image${minCount > 1 ? 's' : ''} required.`
        });
      }
    } else if (files && files[fieldName]) {
      if (files[fieldName].length < minCount) {
        return res.status(400).json({
          success: false,
          message: `At least ${minCount} image${minCount > 1 ? 's' : ''} required for ${fieldName}.`
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `${fieldName} is required.`
      });
    }
    
    next();
  };
};

// Middleware to validate image dimensions (optional)
const validateImageDimensions = (minWidth = 200, minHeight = 200, maxWidth = 4000, maxHeight = 4000) => {
  return async (req, res, next) => {
    try {
      const sharp = require('sharp');
      const files = req.files || (req.file ? [req.file] : []);
      
      for (const file of files) {
        const metadata = await sharp(file.buffer).metadata();
        
        if (metadata.width < minWidth || metadata.height < minHeight) {
          return res.status(400).json({
            success: false,
            message: `Image dimensions too small. Minimum: ${minWidth}x${minHeight}px`
          });
        }
        
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          return res.status(400).json({
            success: false,
            message: `Image dimensions too large. Maximum: ${maxWidth}x${maxHeight}px`
          });
        }
      }
      
      next();
    } catch (error) {
      // If sharp is not available, skip validation
      next();
    }
  };
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  handleUploadError,
  requireFiles,
  validateImageDimensions
}; 