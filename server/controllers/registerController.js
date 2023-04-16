const connectToMongoDB = require("../helpers/mongo");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { name, lastName, age, gender, mail, tel, pwd } = req.body;
  // Gerekli alanların kontrolü

  if (!name) return res.status(400).json({ message: "İsim alanı zorunludur." });
  else if (!lastName)
    return res.status(400).json({ message: "İsim alanı zorunludur." });
  else if (!age)
    return res.status(400).json({ message: "Soyad alanı zorunludur." });
  else if (!gender)
    return res.status(400).json({ message: "Cinsiyet alanı zorunludur." });
  else if (!mail)
    return res.status(400).json({ message: "Mail alanı zorunludur." });
  else if (!tel)
    return res.status(400).json({ message: "Telefon alanı zorunludur." });
  else if (!pwd)
    return res.status(400).json({ message: "Parola alanı zorunludur." });

  connectToMongoDB().then(async ({ db, client }) => {
    const users = db.collection("users");

    const isDuplicate = await users
      .find({ mail: mail })
      .toArray(function (err, result) {
        if (err) console.log(err);
        client.close();
      });

    if (isDuplicate.length > 0)
      return res.status(409).json({ message: "Kullanıcı zaten mevcut." });

    try {
      const hashedPassword = await bcrypt.hash(pwd, 10);
      await db.collection("users").insertOne({
        name: name,
        lastName: lastName,
        age: age,
        gender: gender,
        mail: mail,
        tel: tel,
        pwd: hashedPassword,
        refreshToken: "",
      });

      return res
        .status(201)
        .json({ message: `Yeni kullanıcı ${mail} oluşturuldu.` });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Bir hata oluştu, daha sonra tekrar deneyin." });
    }
  });
};

const otherMethods = async (req, res) => {
  return res.status(400).json({ message: "Bu methoda izin verilmemektedir." });
};

module.exports = { registerController, otherMethods };
