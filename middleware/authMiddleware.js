const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    token = token.split(" ")[1];

   
   const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    
    const myStrictAdminEmail = "novastore156@gmail.com"; 

   
    if (decoded.email !== myStrictAdminEmail && decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. You are not the real Admin!" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Admin Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;