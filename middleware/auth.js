// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // check token in header → frontend must send: Authorization: Bearer <token>
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Access denied. Invalid format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = auth;
