import React, { useState } from "react";

const Bus = ({ seats, selectedSeats, setSelectedSeats }) => {
  const handleSelect = (seatNo) => {
    if (selectedSeats.indexOf(seatNo) > -1) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNo));
    } else {
      if (selectedSeats.length === 5) {
        alert("Tek seferde en fazla 5 koltuk alabilirsiniz.");
        return;
      }
      let newOne = { seatNo: seatNo, yolcu: "", cinsiyet: "" };
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };

  return (
    <div className="rounded-xl bg-gray-100 p-8 flex-col">
      {seats[0]?.map((seat, index) =>
        index % 3 === 0 ? (
          <div className="w-full flex gap-4 my-2 text-center" key={index}>
            <div
              value={seat.seat}
              onClick={() => handleSelect(seat.seat)}
              className={`w-1/3 mr-8 p-2  rounded-xl ${
                seat.gender === "Erkek"
                  ? "bg-blue-400"
                  : seat.gender === "Kadın"
                  ? "bg-red-400"
                  : selectedSeats.indexOf(seat.seat) > -1
                  ? "bg-yellow-400"
                  : "bg-gray-400"
              }`}
            >
              {seat.seat}
            </div>
            <div
              className={`w-1/3 p-2 rounded-xl ${
                seats[0][index + 1].gender === "Erkek"
                  ? "bg-blue-400"
                  : seats[0][index + 1].gender === "Kadın"
                  ? "bg-red-400"
                  : "bg-gray-400"
              }`}
            >
              {seats[0][index + 1].seat}
            </div>
            <div
              className={`w-1/3 p-2 rounded-xl ${
                seats[0][index + 2].gender === "Erkek"
                  ? "bg-blue-400"
                  : seats[0][index + 2].gender === "Kadın"
                  ? "bg-red-400"
                  : "bg-gray-400"
              }`}
            >
              {seats[0][index + 2].seat}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Bus;
