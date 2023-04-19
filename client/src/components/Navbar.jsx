import React from "react";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector(selectCurrentToken);

  return (
    <nav className="bg-gray-600">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div></div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {token ? (
                <>
                  <Link
                    to={"/journeys"}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium text-lg"
                  >
                    Seferler
                  </Link>
                  <Link
                    to={"/mytickets"}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium text-lg"
                  >
                    Biletlerim
                  </Link>
                </>
              ) : null}
            </div>
          </div>
          <div className="hidden md:block">
            {!token ? (
              <React.Fragment>
                <Link
                  to={"/login"}
                  className="text-gray-300 hover:text-white font-medium text-lg p-2 px-5 bg-green-500 rounded-xl mx-2"
                >
                  Giriş
                </Link>
                <Link
                  to={"/register"}
                  className="text-gray-300 hover:text-white font-medium text-lg p-2 px-5 bg-blue-500 rounded-xl mx-2"
                >
                  Kayıt Ol
                </Link>
              </React.Fragment>
            ) : (
              <Link
                to={"/logout"}
                className="text-gray-300 hover:text-white block text-base font-medium p-2 px-5 bg-red-500 rounded-xl"
              >
                Çıkış
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden text-center">
        <div className="px-8 pt-2 pb-4 space-y-1 sm:px-3">
          {!token ? (
            <React.Fragment>
              <Link
                to={"/login"}
                className="text-gray-300 hover:text-white block text-base font-medium p-2 px-5 bg-green-500 rounded-xl"
              >
                Giriş
              </Link>
              <Link
                to={"/register"}
                className="text-gray-300 hover:text-white block text-base font-medium p-2 px-5 bg-blue-500 rounded-xl"
              >
                Kayıt Ol
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                to={"/journeys"}
                className="text-gray-300 hover:text-white block px-3 py- rounded-md text-base font-medium mb-3"
              >
                Anasayfa
              </Link>
              <Link
                to={"/logout"}
                className="text-gray-300 hover:text-white block text-base font-medium p-2 px-5 bg-red-500 rounded-xl"
              >
                Çıkış
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
