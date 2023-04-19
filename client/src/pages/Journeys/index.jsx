import React, { useEffect, useState } from "react";
import {
  useFilteredJourneysQuery,
  useGetJourneysQuery,
  useJourneyDetailsQuery,
} from "../../features/api/journeysApiSlice";
import Loading from "../../components/Loading";
import Bus from "./Bus";

const sehirler = ["İstanbul", "Ankara", "İzmir"];

const Journeys = () => {
  const [selected, setSelected] = useState({ from: "", to: "", date: "" });
  const [details, setDetails] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { data: journeys, isLoading } = useGetJourneysQuery();
  const { data: filtered, isLoading: isLoading2 } =
    useFilteredJourneysQuery(selected);
  const { data: journeyDetails, isLoading: isLoading3 } =
    useJourneyDetailsQuery(details);

  const handleStateChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setSelected({ ...selected, [name]: value });
  };

  useEffect(() => {
    setDetails("");
  }, [selected]);

  return isLoading || isLoading2 || isLoading3 ? (
    <Loading />
  ) : (
    <section className="flex flex-row flex-wrap justify-evenly h-[36rem] items-center">
      <div className="px-24 py-12 bg-green-300 rounded-xl shadow-2xl shadow-gray-700 text-center">
        <form>
          {/*
            <label htmlFor="date">Sefer Tarihi</label>
          <input
            type="date"
            id="date"
            value={selected.date}
            name="date"
            onChange={handleStateChange}
            className="block appearance-none w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 my-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
            */}
          <label htmlFor="from">Nereden:</label>
          <select
            value={selected.from}
            name="from"
            onChange={handleStateChange}
            id="from"
            className="block w-full py-2 px-3 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
          >
            <option>Seçiniz...</option>
            {sehirler.map((city) =>
              selected.to !== city ? <option key={city}>{city}</option> : null
            )}
          </select>
          <label htmlFor="to" className="my-4">
            Nereye:
          </label>
          <select
            value={selected.to}
            name="to"
            onChange={handleStateChange}
            id="to"
            className="block w-full py-2 px-3 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
          >
            <option>Seçiniz...</option>
            {sehirler.map((city) =>
              selected.from !== city ? <option key={city}>{city}</option> : null
            )}
          </select>
          {/*
            <input
            type="submit"
            className="p-4 rounded-lg bg-blue-300 hover:bg-blue-500 hover:scale-90"
            value={"Seferleri Listele"}
          />
            */}
        </form>
      </div>
      {filtered?.length > 0 ? (
        <div className="bg-red-200 p-4 rounded-lg mx-2">
          {filtered?.map((journey) => (
            <div
              className={`py-3 px-5 border-2 rounded-xl border-gray-700 my-5 ${
                details === journey._id && "bg-green-900"
              }`}
              key={journey._id}
            >
              <span className="bg-orange-400 p-2 rounded-lg mx-3">{`${journey.from} - ${journey.to}\t`}</span>
              <span className="bg-green-500 p-2 rounded-lg mx-3">{`${journey.ticketPrice} ₺`}</span>
              <span className="bg-red-700 p-2 rounded-lg mx-5">{`${new Date(
                journey.startedDate
              ).toLocaleTimeString("tr-TR")}`}</span>

              <button
                className="p-2 bg-orange-300 rounded-lg hover:scale-90"
                onClick={() => setDetails(journey._id)}
              >
                Detaylar
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {journeyDetails?.length > 0 ? (
        <>
          <div className="text-white p-5 bg-blue-400 rounded-xl h-[33rem] ">
            <h1>Sefer Detayları</h1>
            <p>
              Tarih:{" "}
              {new Date(journeyDetails[0].startedDate).toLocaleDateString(
                "tr-TR"
              )}{" "}
              <br />
              Saat:{" "}
              {new Date(journeyDetails[0].startedDate).toLocaleTimeString(
                "tr-TR"
              )}{" "}
              <br />
              Koltuk Sayısı: {journeyDetails[0].seatCount} <br />
            </p>
            <hr />
            <form className="my-3">
              {selectedSeats.map((seat) => (
                <div key={seat}>
                  <span>Koltuk No: {seat}</span>
                  <br />
                  <input
                    className="p-2 rounded-lg"
                    type="text"
                    placeholder="Yolcu adı"
                  />
                  <label htmlFor="male">Erkek</label>
                  <input type="radio" value={"Erkek"} name="gender" id="male" />
                  <label htmlFor="female">Kadın</label>
                  <input
                    type="radio"
                    value={"Kadın"}
                    name="gender"
                    id="female"
                  />
                </div>
              ))}
            </form>
          </div>
          <Bus
            seats={journeyDetails[0].tickets}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </>
      ) : null}
    </section>
  );
};

export default Journeys;
