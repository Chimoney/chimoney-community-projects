import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = `${process.env.API_KEY}`

// 'https://api.chimoney.io/v0.2/sub-account/create'
export const paypaddyApi = createApi({
    reducerPath: 'paypaddyApiCore',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.chimoney.io/v0.2/',
        prepareHeaders: (headers) => {
            headers.set('X-API-KEY', API_KEY)
            return headers
        }
    }),
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (payload) => ({
                url: 'sub-account/create',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const { useCreateAccountMutation } = paypaddyApi