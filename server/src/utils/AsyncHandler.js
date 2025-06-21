const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error('AsyncHandler caught error:', err);
      next(err);
    });
  };
};

export default asyncHandler;