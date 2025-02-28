const admin = require("../utils/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Gán user đã xác thực vào req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

export default verifyFirebaseToken;
