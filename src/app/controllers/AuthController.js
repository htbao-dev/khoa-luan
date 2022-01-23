const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthController {
  login(req, res, next) {
    const { username, password } = req.body;

    User.findOne({ username: username })
      .then((user) => {
        if (!user) return res.status(401).json({ message: "USER_NOT_FOUND" });
        if (user.password !== password)
          return res.status(401).json({ message: "PASSWORD_INCORRECT" });

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        const dataForToken = {
          username: user.username,
        };

        const accessToken = jwt.sign(dataForToken, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });

        let refreshToken = jwt.sign(dataForToken, refreshTokenSecret);

        if (!accessToken)
          return res.status(401).json({ message: "TOKEN_NOT_FOUND" });

        if (!user.refreshToken) {
          user.refreshToken = refreshToken;
          user.save();
        } else {
          refreshToken = user.refreshToken;
        }

        return res.status(200).json({
          message: "LOGIN_SUCCESS",
          accessToken: accessToken,
          refreshToken: refreshToken,
          userInfo: {
            username: user.username,
            name: user.name,
            id: user._id,
          },
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  refreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;

    User.findOne({ refreshToken: refreshToken })
      .then((user) => {
        if (!user) return res.status(401).json({ message: "User not found" });

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForToken = {
          username: user.username,
        };

        const accessToken = jwt.sign(dataForToken, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });

        if (!accessToken)
          return res.status(401).json({ message: "Token not found" });

        return res.status(200).json({
          message: "Login success",
          accessToken: accessToken,
          // user: user,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  register(req, res, next) {
    const { username, password, name } = req.body;
    User.findOne({ username: username })
      .then((user) => {
        if (user) return res.status(401).json({ message: "User already exists" });
        const newUser = new User({
          username: username,
          password: password,
          name: name,
        });
        newUser
          .save()
          .then((user) => {
            return res.status(200).json({
              message: "Register success",
              user: user,
            });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }

  logout(req, res, next) {

    const refreshToken = req.body.refreshToken;
    console.log("logout refreshToken: ", refreshToken);

    User.findOne({ refreshToken: refreshToken })
      .then((user) => {
        if (!user) return res.status(401).json({ message: "User not found" });

        user.refreshToken = null;
        user.save();

        return res.status(200).json({ message: "Logout success" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = new AuthController();
