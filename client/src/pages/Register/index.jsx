import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col items-center justify-center h-96">
      <form
        className="shadow-2xl rounded-3xl py-12 px-32 bg-gray-400"
        onSubmit={handleRegister}
      >
        <div className="text-center text-white text-3xl mb-8">Kayıt Ol</div>
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="email"
            placeholder="E mail adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="password"
            placeholder="Şifreniz"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            className="rounded-2xl bg-green-600 p-2 mt-5 w-full cursor-pointer hover:bg-green-400 hover:scale-110 text-white"
            type="submit"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
