
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function auth(req, res, next){
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should contain: { userId, tenantId, role, tenantSlug }
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default auth
