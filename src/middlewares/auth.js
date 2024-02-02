import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export { auth, generateAuthToken };
