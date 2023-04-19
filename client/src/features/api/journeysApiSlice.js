import { apiSlice } from "./apiSlice";

export const journeysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJourneys: builder.query({
      query: () => ({
        url: "/journeys",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.journeys;
      },
    }),
    filteredJourneys: builder.query({
      query: (data) => ({
        url: "/journeys",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response.journeys;
      },
    }),
    journeyDetails: builder.query({
      query: (id) => ({
        url: `/journeys/${id}`,
        method: "POST",
      }),
      transformResponse: (response) => {
        return response.journey;
      },
    }),
  }),
});

export const {
  useGetJourneysQuery,
  useFilteredJourneysQuery,
  useJourneyDetailsQuery,
} = journeysApiSlice;
