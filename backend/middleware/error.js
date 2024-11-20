const errorHandler = (err, req, res, next) => {
   console.log(err.message);
   
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }

  res.status(500).json({ msg: "Internal Server Error ;(" });
};

export default errorHandler;
