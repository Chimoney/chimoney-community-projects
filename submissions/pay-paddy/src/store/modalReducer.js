import { createSlice } from "@reduxjs/toolkit";

const modalReducer = createSlice({
    name: 'modal',
    initialState: {
        showSignUpModal: false,
        showSignInModal: false
    },
    reducers: {
        showSignUpModal(state, action) {
            return { showSignUpModal: action.payload, showSignInModal: false }
        },
        showSignInModal(state, action) {
            return { showSignUpModal: false, showSignInModal: action.payload }
        }
    }
})

export const { showSignUpModal, showSignInModal } = modalReducer.actions

export default modalReducer.reducer