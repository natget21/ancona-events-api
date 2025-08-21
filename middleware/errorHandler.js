export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: err.errors });
    }
  
    
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate key error', details: err.keyValue });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
          message: "Invalid ID format",
          details: err.value
      });
  }
  
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message || 'Something went wrong',
    });
  };
  