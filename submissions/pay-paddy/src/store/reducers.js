import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})