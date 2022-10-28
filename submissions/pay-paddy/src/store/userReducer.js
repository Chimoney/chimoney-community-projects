import { createSlice } from "@reduxjs/toolkit"
import { createAccount } from "../service/createAccount"

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        create(state, action) {
            return action.payload
        }
    }
})

export const { create } = userSlice.actions

export const createUser = (name, email) => {
    return async dispatch => {
        const account = await createAccount(name, email)
        console.log(account)
        dispatch(create(account))
    }
}

export default userSlice.reducer