const jwt = require("jsonwebtoken");

const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAnhAuthorizationUser = (req, res, next) => {
  verifyTokenUser(req, res, () => {
    if (req.user.id === req.params.id || req.user.id === req.params.userId) {
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
