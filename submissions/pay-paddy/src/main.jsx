import React from 'react'
import ReactDOM from 'react-dom/client'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { Provider } from 'react-redux'
import { firebaseReducer, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import Layout from './components/Layout'
import './index.css'
import userReducer from './store/userReducer'
import modalReducer from './store/modalReducer'
import { firebaseConfig } from './firebase/firebase-config'
import { configureStore } from '@reduxjs/toolkit'
import { paypaddyApi } from './service/createAccount'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const store = configureStore({
  reducer: {
      firebaseReducer,
      firestoreReducer,
      [paypaddyApi.reducerPath]: paypaddyApi.reducer,
      modal: modalReducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
          serializableCheck: false,
      })
})

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
)
