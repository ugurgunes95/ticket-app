const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectToMongoDB = require("../helpers/mongo");

const authController = async (req, res) => {
  const { user, pwd } = req.body;

  // Email ve Parola alanlarının kontrolü
  if (!user)
    return res.status(400).json({ message: "Email adresi zorunludur." });
  else if (!pwd) return res.status(400).json({ message: "Parola zorunludur." });

  // Buradan devam edilecek
  connectToMongoDB().then(async ({ db, client }) => {
    const users = db.collection("users");

    const isExist = await users
      .find({ mail: user })
      .toArray(function (err, result) {
        if (err)
          return res
            .status(500)
            .json({ message: "Bir hata oluştu, daha sonra tekrar deneyin." });

        client.close();
      });

    if (isExist.length < 1)
      return res.status(401).json({ message: "Kullanıcı mevcut değil." });

    const match = await bcrypt.compare(pwd, isExist[0].pwd);

    if (match) {
      const accessToken = jwt.sign(
        { username: isExist[0].mail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { username: isExist[0].mail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await users.updateOne(
        { mail: user },
        { $set: { refreshToken: refreshToken } }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 600 * 60 * 1000,
      });

      res.json({
        accessToken,
        user,
      });
    } else {
      return res.status(401).json({ message: "Parola yanlış" });
    }
  });
};

module.exports = { authController };
