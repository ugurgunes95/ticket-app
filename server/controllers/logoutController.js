const connectToMongoDB = require("../helpers/mongo");

const logoutController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  connectToMongoDB().then(async ({ db, client }) => {
    const users = db.collection("users");

    const foundUser = await users.findOne({ refreshToken: refreshToken });

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.sendStatus(204);
    }

    await users.updateOne(
      { refreshToken: foundUser.refreshToken },
      { $set: { refreshToken: "" } }
    );

    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  });
};

module.exports = { logoutController };
