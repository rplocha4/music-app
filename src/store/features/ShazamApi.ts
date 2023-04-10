import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://shazam.p.rapidapi.com/' }),
    endpoints: (builder) => ({  
        getAutoComplete: builder.query({
            query: (searchTerm) => ({
                url:`auto-complete?term=${searchTerm}&locale=en-US`,
                headers: {
                        'X-RapidAPI-Key': '8f5e49604amsh7932ebb0aefea30p1b4c3bjsn7ac20affb784',
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
                },

            })
        })
    })
})

export const { useGetAutoCompleteQuery } = shazamApi;