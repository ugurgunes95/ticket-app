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
    if (!db.collection("users")) {
      console.log("Veri tabanında kullanıcılar tablosu oluşturuluyor...");
      await db.createCollection("users");
      console.log("Veri tabanında kullanıcılar tablosu oluşturuldu...");
    }

    if (!db.collection("journeys")) {
      console.log("Veri tabanında seferler tablosu oluşturuluyor...");
      await db.createCollection("journeys");
      console.log("Veri tabanında seferler tablosu oluşturuldu...");
    }

    const journeys = await db.collection("journeys").find({}).toArray();

    if (journeys.length < 1) {
      console.log("Veri tabanına seferler ekleniyor...");
      const seats = generateSeats(30);
      await db.collection("journeys").insertMany([
        {
          from: "İstanbul",
          to: "İzmir",
          startedDate: new Date("2023-04-27T16:00:00Z"),
          arriveDate: new Date("2023-04-27T22:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
        {
          from: "İstanbul",
          to: "İzmir",
          startedDate: new Date("2023-04-27T18:00:00Z"),
          arriveDate: new Date("2023-04-27T00:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
        {
          from: "İstanbul",
          to: "Ankara",
          startedDate: new Date("2023-04-27T18:00:00Z"),
          arriveDate: new Date("2023-04-27T00:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
        {
          from: "İzmir",
          to: "İstanbul",
          startedDate: new Date("2023-04-28T16:00:00Z"),
          arriveDate: new Date("2023-04-28T22:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
        {
          from: "İzmir",
          to: "İstanbul",
          startedDate: new Date("2023-04-28T18:00:00Z"),
          arriveDate: new Date("2023-04-28T00:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
        {
          from: "Ankara",
          to: "İstanbul",
          startedDate: new Date("2023-04-28T18:00:00Z"),
          arriveDate: new Date("2023-04-28T00:00:00Z"),
          ticketPrice: 400.0,
          seatCount: 30,
          tickets: [seats],
        },
      ]);
      console.log("Veri tabanına seferler eklendi...");
    }
  });
};

const generateSeats = (seat) => {
  let seats = [];

  for (let i = 1; i <= seat; i++) {
    seats.push({
      seat: i,
      gender: "",
      yolcuBilgileri: {
        name: "",
        surname: "",
        mail: "",
      },
    });
  }

  return seats;
};

module.exports = initialize;
