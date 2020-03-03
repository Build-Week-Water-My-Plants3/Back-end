const router = require("express").Router();
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./authModel");
const { jwtSecret } = require("../../api/config/secrets");

// ADD NEW USER
router.post("/register", (req, res) => {
  const userData = req.body;
  if (userData.username && userData.password && userData.phonenumber) {
    const hash = crypt.hashSync(userData.password, 8);
    userData.password = hash;
    auth
      .add(userData)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(error => {
        res.status(400).json({ error: " cant be registerd" });
      });
  } else {
    res.status(400).json({ error: " missing" });
  }
});

// LOGIN EXISTING USER
// Fixing some things like add ID Monday after passing assesment
router.post("/login", (req, res) => {
  const userData = req.body;

  if (userData.username && userData.password) {
    auth
      .findBy({ username: userData.username })
      .then(user => {
        if (user && crypt.compareSync(userData.password, user.password)) {
          const token = signToken(user);
          res.status(200).json({ id: user.id, token });
        }
      })
      .catch(error => {
        res.status(400).json({ error: "invalid user" });
      });
  } else {
    res.status(400).json({ error: " missing required" });
  }
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "5hrs"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
