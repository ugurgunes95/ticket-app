require("dotenv").config();

const connectToMongoDB = require("../helpers/mongo");
const jwt = require("jsonwebtoken");

const refreshController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  connectToMongoDB().then(async ({ db, client }) => {
    const users = db.collection("users");

    const foundUser = await users.findOne({ refreshToken: refreshToken });

    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || foundUser.mail !== decoded.username) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({
          user: foundUser.mail,
          accessToken,
        });
      }
    );
  });
};

module.exports = { refreshController };
