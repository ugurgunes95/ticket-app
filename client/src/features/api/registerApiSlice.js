import { apiSlice } from "./apiSlice";

const registerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApiSlice;
