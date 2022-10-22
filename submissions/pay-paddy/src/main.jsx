import React from 'react'
import ReactDOM from 'react-dom/client'
import firebase from 'firebase/compat/app'
import { createFirestoreInstance } from 'redux-firestore'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import App from './App'
import Layout from './components/Layout'
import './index.css'
import { rootReducer } from './store/reducers'
import { firebaseConfig } from './firebase/firebase-config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const initialState = {}
const store = createStore(rootReducer, initialState)

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
        <Layout >
          <App />
        </Layout>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
)
