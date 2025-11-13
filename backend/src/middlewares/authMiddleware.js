// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Token não encontrado!" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token inválido ou expirado" });
//   }
// };


// --
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

console.log("🔍 Auth Header:", authHeader);
  console.log("🔍 Token extraído:", token);
  console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ error: "Token não encontrado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("✅ Token decodificado:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
        console.error("❌ Erro ao verificar token:", err.message);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
