const connectToMongoDB = require("./mongo");

const initialize = async () => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    const secretKey = require("crypto")
      .randomBytes(256 / 8)
      .toString("hex");

    require("fs").appendFileSync(
      require("path").join(__dirname, "..", ".env"),
      `\nACCESS_TOKEN_SECRET=${secretKey}\n`
    );
  }

  if (!process.env.REFRESH_TOKEN_SECRET) {
    const secretKey = require("crypto")
      .randomBytes(256 / 8)
      .toString("hex");

    require("fs").appendFileSync(
      require("path").join(__dirname, "..", ".env"),
      `REFRESH_TOKEN_SECRET=${secretKey}`
    );
  }

  connectToMongoDB().then(async ({ db, client }) => {
    if (!db.collection("users")) db.createCollection("users");
  });
};

module.exports = initialize;
