import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!req.headers.authorization) {
    const error = new Error("unauthorized user!");
    error.status = 401;
    return next(error);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = user;

    next();
  });
}

export default authenticateToken;
