import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// refresh token expire olduğunda otomatik olarak refresh endpointine istek atıp sonra asıl isteği tekrar gönderen
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // İlk önce isteği atıyoruz
  let result = await baseQuery(args, api, extraOptions);
  // console.log(args);
  // Sonucu kontrol ediyoruz
  if (result?.error?.originalStatus == 403) {
    console.log("Sending refresh token");
    // Unauthorized ise refresh token isteği atıyoruz
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    // Yeni token dönerse save ediyoruz
    if (refreshResult?.data) {
      // Önce şu anki kullanıcı bilgisini alıyoruz
      const user = api.getState().auth.user;

      // User bilgisiyle birlikte yeni tokenı set ediyoruz
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // Asıl isteği yeni token ile tekrar gönderiyoruz

      result = await baseQuery(args, api, extraOptions);
    } else {
      // Aksi takdirde çıkış yaptırıyoruz.
      api.dispatch(logOut());
    }
  }
  return result;
};

// apiSlice'ı oluşturup export ediyoruz.
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
