const { jwtSecret } = require("../config/secrets");

const jwt = require("jsonwebtoken");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ error: "wrong token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "wrong token" });
  }
}

module.exports = restricted;
