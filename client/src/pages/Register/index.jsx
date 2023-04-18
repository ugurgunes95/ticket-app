import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../../features/api/registerApiSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Register = () => {
  const [register, { isLoading, error, isError, isSuccess }] =
    useRegisterMutation();

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    gender: "",
    tel: "",
    email: "",
    pwd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && isNaN(value)) {
      return;
    }
    if (name === "gender" && value === "Cinsiyet") {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAgeKeyDown = (event) => {
    const { key, target } = event;
    if (key === "Backspace" && target.value.length === 1) {
      event.preventDefault();
      setFormData({ ...formData, age: "" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(formData).unwrap();
  };

  useEffect(() => {
    if (isError) {
      setMsg(error.data.message);
    } else if (isSuccess) {
      setMsg("Kayıt işlemi başarılı, giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/login", { replace: true }), 1250);
    }

    setTimeout(() => setMsg(""), 1250);
  }, [isError, isSuccess]);

  return (
    <section className="flex items-center justify-center h-[36rem]">
      {isLoading ? <Loading /> : null}
      <form
        className="shadow-2xl shadow-gray-700 rounded-3xl py-8 px-32 bg-gray-400"
        onSubmit={handleRegister}
      >
        <div className="text-center text-white text-3xl mb-8">Kayıt Ol</div>
        {msg ? (
          <p className="text-center m-2 p-2 bg-red-300 rounded-2xl">{msg}</p>
        ) : null}
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="text"
            name="name"
            placeholder="Adınız"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="text"
            name="lastName"
            placeholder="Soyadınız"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="text"
            name="age"
            placeholder="Yaşınız"
            value={formData.age}
            onChange={handleInputChange}
            required
            maxLength="2"
            onKeyDown={handleAgeKeyDown}
          />
        </div>
        <div className="my-2">
          <select
            value={formData.gender}
            onChange={handleInputChange}
            name="gender"
            className="rounded-2xl p-2 px-4 w-full"
          >
            <option>Cinsiyet</option>
            <option value={"Erkek"}>Erkek</option>
            <option value={"Kadın"}>Kadın</option>
          </select>
        </div>
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="email"
            name="email"
            placeholder="E mail adresiniz"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="my-2">
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="tel"
            name="tel"
            placeholder="Telefon numaranız"
            value={formData.tel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            className="rounded-2xl p-2 px-4 focus:bg-blue-200"
            type="password"
            name="pwd"
            placeholder="Şifreniz"
            value={formData.pwd}
            onChange={handleInputChange}
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
