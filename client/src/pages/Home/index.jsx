import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="p-16 bg-red-400 rounded-xl shadow-2xl shadow-gray-700">
        <p>Seferleri listelemek için giriş yapınız.</p>
        <Link to={"/login"}>Giriş Yap</Link>
      </div>
    </div>
  );
};

export default Home;
