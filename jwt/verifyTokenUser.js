const jwt = require("jsonwebtoken");
const admin = require("../utils/firebaseAdmin");

const verifyTokenUser = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Xác thực bằng JWT trước
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (!err) {
        req.user = user;
        return next(); // ✅ Xác thực JWT thành công
      }
    });

    // Nếu JWT không xác thực được, thử xác thực bằng Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    return next(); // ✅ Xác thực Firebase thành công
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Token is not valid!" });
  }
};

const verifyTokenAnhAuthorizationUser = (req, res, next) => {
  verifyTokenUser(req, res, async () => {
    if (
      req.user.id === req.params.id || // Trường hợp ID từ params là `id`
      req.user.uid === req.params.id || // Trường hợp ID từ Firebase là `uid`
      req.user.id === req.params.userId || // Trường hợp ID từ params là `userId`
      req.user.uid === req.params.userId
    ) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
};
