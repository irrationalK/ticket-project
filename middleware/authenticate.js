const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
   const authHeader = req.header('Authorization');
   if (!authHeader) return res.status(401).json({ error: "No token provided." });

   // Extrahieren des Tokens vom Bearer-Schema
   const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
   if (!token) return res.status(401).json({ error: "Invalid Authorization format. Use 'Bearer <TOKEN>'." });

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token." });

      req.user = decoded;
      next();
   });
};

module.exports = authenticate;
